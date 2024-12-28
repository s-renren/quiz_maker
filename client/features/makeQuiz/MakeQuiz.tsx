import useAspidaSWR from '@aspida/swr';
import { labelValidator } from 'common/validators/task';
import styles from 'features/makeQuiz/MakeQuiz.module.css';
import Quiz from 'features/quiz/Quiz';
import { useAlert } from 'hooks/useAlert';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { Layout } from 'layouts/Layout';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';

interface Option {
  id: string;
  name: string;
}

const MakeQuiz = () => {
  const { setAlert } = useAlert();
  const [quiz, setQuiz] = useState('');
  const [answer, setAnswer] = useState('');
  const [listName, setListName] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [, setArrowActive] = useState(false);
  const { mutate: mutateWorks } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const createWork = async (e: FormEvent) => {
    e.preventDefault();

    if (!listName) {
      await setAlert('リストを選択してください');
      return;
    }

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
          list: listName.id,
        },
      })
      .then((work) => mutateWorks((works) => [work, ...(works ?? [])]))
      .catch(catchApiErr);
    setQuiz('');
    setAnswer('');
  };

  const getAllList = async () => {
    const res = await apiClient.private.lists.$get();
    const mappedOptions = res.map((item: { id: string; name: string }) => ({
      id: item.id,
      name: item.name,
    }));
    setOptions(mappedOptions);
  };

  useEffect(() => {
    getAllList();
  }, []);

  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selected = options.find((option) => option.id === selectedValue);
    setListName(selected || null);
  };

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
              <div className={styles.selectContainer}>
                <select
                  value={listName?.name || ''}
                  onChange={handleSelectOption}
                  onFocus={() => setArrowActive(true)}
                  onBlur={() => setArrowActive(false)}
                >
                  <option value="">{listName ? listName.name : '選択してください'}</option>
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

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
