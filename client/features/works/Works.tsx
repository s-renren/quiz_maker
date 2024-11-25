import { useState } from 'react';
import styles from './works.module.css';

export const Works = () => {
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <div className={styles.main}>
      <div className={styles.makeQuiz}>
        <form className={styles.form}>
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
    </div>
  );
};
