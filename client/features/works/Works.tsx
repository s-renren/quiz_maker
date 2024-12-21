import QuizList from 'features/quizList/QuizList';
import styles from './works.module.css';

export const Works = () => {
  return (
    <div className={styles.main}>
      <div className={styles.makeQuiz}>
        <a href="/makeQuiz" className={styles.makeBtn}>
          問題を作成する
        </a>
      </div>
      <QuizList />
    </div>
  );
};
