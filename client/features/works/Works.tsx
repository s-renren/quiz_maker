import useAspidaSWR from '@aspida/swr';
import type { WorkDto } from 'common/types/work';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { apiClient } from 'utils/apiClient';
import styles from './works.module.css';

// type ContentDict = Record<DtoId['work'], string | undefined>;

export const Works = () => {
  const { data: works, mutate: mutateWorks } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const deleteWork = async (work: WorkDto) => {
    await apiClient.private.works
      ._workId(work.id)
      .$delete()
      .then((work) => mutateWorks((works) => works?.filter((w) => w.id !== work.id)))
      .catch(catchApiErr);
  };

  return (
    <div className={styles.main}>
      <div className={styles.makeQuiz}>
        <a href="/makeQuiz" className={styles.makeBtn}>
          問題を作成する
        </a>
      </div>

      <div className={styles.quizList}>
        {works?.map((work) => (
          <div key={work.id} className={styles.quiz}>
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
    </div>
  );
};
