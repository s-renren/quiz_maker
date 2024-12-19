import useAspidaSWR from '@aspida/swr';
import type { WorkDto } from 'common/types/work';
import { labelValidator } from 'common/validators/task';
import { useAlert } from 'hooks/useAlert';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './works.module.css';

// type ContentDict = Record<DtoId['work'], string | undefined>;

export const Works = () => {
  // const [works, setWorks] = useState<WorkDto[]>();
  const { setAlert } = useAlert();
  const { data: works, mutate: mutateTasks } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');
  const catchApiErr = useCatchApiErr();
  // const [contentDict, setContentDict] = useState<ContentDict>({});
  // const fetchContent = useCallback(async (w: WorkDto) => {
  //   const content = await fetch(w.quiz).then((b) => b.text());
  //   setContentDict((dict) => ({ ...dict, [w.id]: content }));
  // }, []);

  const createWork = async (e: FormEvent) => {
    e.preventDefault();

    const parsedLabel = labelValidator.safeParse(quiz);

    if (parsedLabel.error) {
      await setAlert(parsedLabel.error.issues[0].message);
      return;
    }

    await apiClient.private.works
      .$post({
        body: {
          quiz,
          answer,
        },
      })
      .then((work) => mutateTasks((works) => [work, ...(works ?? [])]))
      .catch(catchApiErr);
    setQuiz('');
    setAnswer('');
  };

  const deleteWork = async (work: WorkDto) => {
    await apiClient.private.works
      ._workId(work.id)
      .$delete()
      .then((work) => mutateTasks((works) => works?.filter((w) => w.id !== work.id)))
      .catch(catchApiErr);
  };

  // useEffect(() => {
  //   if (works !== undefined) return;

  //   apiClient.private.works
  //     .$get()
  //     .then((ws) => {
  //       setWorks(ws);

  //       return Promise.all(ws.map(fetchContent));
  //     })
  //     .catch(catchApiErr);
  // }, [catchApiErr, fetchContent, works, contentDict]);

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
              <button className={styles.btn} onClick={() => deleteWork(work)}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
