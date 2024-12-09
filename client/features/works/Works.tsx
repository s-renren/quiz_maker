import type { DtoId } from 'common/types/brandedId';
import type { WorkEntity } from 'common/types/work';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import type { FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './works.module.css';

type ContentDict = Record<DtoId['work'], string | undefined>;

// const MainContent = (props: {work:WorkEntity;contentDict:ContentDict}) => {
//   return (
//     <div>

//     </div>
//   );
// }

export const Works = () => {
  const [works, setWorks] = useState<WorkEntity[]>();
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');
  const [contentDict, setContentDict] = useState<ContentDict>({});
  const catchApiErr = useCatchApiErr();
  const fetchContent = useCallback(async (w: WorkEntity) => {
    const content = await fetch(w.quiz).then((b) => b.text());
    setContentDict((dict) => ({ ...dict, [w.id]: content }));
  }, []);

  const createWork = async (e: FormEvent) => {
    e.preventDefault();
    setQuiz('');
    setAnswer('');

    const work = await apiClient.private.works
      .$post({
        body: {
          quiz,
          answer,
        },
      })
      .catch(catchApiErr);

    if (work !== null && works?.every((w) => w.id !== work.id)) {
      setWorks((works) => [work, ...(works ?? [])]);
    }
  };

  useEffect(() => {
    if (works !== undefined) return;

    apiClient.private.works
      .$get()
      .then((ws) => {
        setWorks(ws);

        return Promise.all(ws.map(fetchContent));
      })
      .catch(catchApiErr);
  }, [catchApiErr, fetchContent, works, contentDict]);

  return (
    <div className={styles.main}>
      <div className={styles.makeQuiz}>
        <form className={styles.form} onSubmit={createWork}>
          <input
            value={quiz}
            className={styles.textInput}
            type="text"
            placeholder="問題文を入力してください"
            onChange={(e) => setQuiz(e.target.value)}
          />
          <input
            value={answer}
            className={styles.textInput}
            type="text"
            placeholder="答えを入力してください"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className={styles.controls}>
            <input className={styles.btn} disabled={quiz === ''} type="submit" value="CREATE" />
          </div>
        </form>
      </div>
      {works?.map((work) => (
        <div key={work.id} className={styles.makeQuiz}>
          {/* <MainContent work={work} contentDict={contentDict} /> */}
          <div className={styles.form}>
            <div className={styles.title}>
              <span>{work.quiz}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
