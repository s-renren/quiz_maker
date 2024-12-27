import useAspidaSWR from '@aspida/swr';
import { labelValidator } from 'common/validators/task';
import styles from 'features/makeQuiz/MakeQuiz.module.css';
import Quiz from 'features/quiz/Quiz';
import { useAlert } from 'hooks/useAlert';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { Layout } from 'layouts/Layout';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';

const MakeQuiz = () => {
  const { setAlert } = useAlert();
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');
  const { mutate: mutateWorks } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const createWork = async (e: FormEvent) => {
    e.preventDefault();

    const parsedLabel = labelValidator.safeParse(quiz);
    const parsedLabel2 = labelValidator.safeParse(answer);

    if (parsedLabel.error) {
      await setAlert(parsedLabel.error.issues[0].message);
      return;
    } else if (parsedLabel2.error) {
      await setAlert(parsedLabel2.error.issues[0].message);
      return;
    }

    await apiClient.private.works
      .$post({
        body: {
          quiz,
          answer,
        },
      })
      .then((work) => mutateWorks((works) => [work, ...(works ?? [])]))
      .catch(catchApiErr);
    setQuiz('');
    setAnswer('');
  };

  return (
    <Layout
      render={() => (
        <div className={styles.main}>
          <div className={styles.makeQuiz}>
            <a href="/" className={styles.makeBtn}>
              ホームに戻る
            </a>
          </div>
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
                <input
                  className={styles.btn}
                  disabled={quiz === '' || answer === ''}
                  type="submit"
                  value="CREATE"
                />
              </div>
            </form>
          </div>
          <Quiz />
        </div>
      )}
    />
  );
};

export default MakeQuiz;
