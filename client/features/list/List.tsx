import useAspidaSWR from '@aspida/swr';
import type { ListDto } from 'common/types/list';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { useRouter } from 'next/router';
import { apiClient } from 'utils/apiClient';
import styles from './List.module.css';

const List = () => {
  const { data: lists, mutate: mutateLists } = useAspidaSWR(apiClient.private.lists, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();
  const router = useRouter();

  const deleteList = async (list: ListDto) => {
    await apiClient.private.lists
      ._listId(list.id)
      .$delete()
      .then((list) => mutateLists((lists) => lists?.filter((l) => l.id !== list.id)))
      .catch(catchApiErr);
  };

  const handleClickList = (listId: string) => {
    try {
      router.push(`../quiz/?id=${listId}`);
    } catch (error) {
      console.error(error);
      alert('エラーが発生しました');
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.quizList}>
        {lists?.map((list) => (
          <div key={list.id} className={styles.quiz}>
            <div className={styles.form}>
              <div className={styles.title}>
                <span onClick={() => handleClickList(list.id)}>{list.name}</span>
                <button className={styles.btn} onClick={() => deleteList(list)}>
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

export default List;
