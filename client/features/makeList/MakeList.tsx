import useAspidaSWR from '@aspida/swr';
import { labelValidator } from 'common/validators/task';
import List from 'features/list/List';
import { useAlert } from 'hooks/useAlert';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { Layout } from 'layouts/Layout';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './MakeList.module.css';

const MakeList = () => {
  const { setAlert } = useAlert();
  const [list, setList] = useState('');
  const { mutate: mutateLists } = useAspidaSWR(apiClient.private.lists, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const createList = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = labelValidator.safeParse(list);

    if (parsed.error) {
      await setAlert(parsed.error.issues[0].message);
      return;
    }

    await apiClient.private.lists
      .$post({
        body: {
          name: list,
        },
      })
      .then((list) => mutateLists((lists) => [list, ...(lists ?? [])]))
      .catch(catchApiErr);
    setList('');
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
              <a href="/makeQuiz" className={styles.makeBtn}>
                問題を作成する
              </a>
            </div>
          </div>
          <div className={styles.makeQuiz}>
            <form className={styles.form} onSubmit={createList}>
              <input
                value={list}
                className={styles.textInput}
                type="text"
                placeholder="リストの名前"
                onChange={(e) => setList(e.target.value)}
              />
              <div className={styles.controls}>
                <input className={styles.btn} disabled={list === ''} type="submit" value="CREATE" />
              </div>
            </form>
          </div>
          <div className={styles.listName}>
            <p>リスト一覧</p>
          </div>
          <List />
        </div>
      )}
    />
  );
};

export default MakeList;
