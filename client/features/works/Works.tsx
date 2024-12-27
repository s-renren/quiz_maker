import Quiz from 'features/quiz/Quiz';
import styles from './works.module.css';

export const Works = () => {
  return (
    <div className={styles.main}>
      <div className={styles.btnList}>
        <div className={styles.makeQuiz}>
          <a href="/makeQuiz" className={styles.makeBtn}>
            問題を作成する
          </a>
        </div>
        <div className={styles.makeQuiz}>
          <a href="/makeList" className={styles.makeBtn}>
            リストを作成する
          </a>
        </div>
      </div>
      <Quiz />
    </div>
  );
};
