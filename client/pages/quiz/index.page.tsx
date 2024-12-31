import QuizInList from 'features/quizInList/QuizInList';
import { Layout } from 'layouts/Layout';
import styles from './index.module.css';

const Quiz = () => {
  return (
    <Layout
      render={() => (
        <div className={styles.main}>
          <div className={styles.btnList}>
            <div className={styles.makeQuiz}>
              <a href="/" className={styles.makeBtn}>
                ホームに戻る
              </a>
            </div>
            <div className={styles.makeQuiz}>
              <a href="/makeList" className={styles.makeBtn}>
                リストを作成する
              </a>
            </div>
          </div>
          <QuizInList />
        </div>
      )}
    />
  );
};

export default Quiz;
