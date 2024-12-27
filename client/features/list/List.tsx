import useAspidaSWR from '@aspida/swr';
import type { ListDto } from 'common/types/list';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import { apiClient } from 'utils/apiClient';
import styles from './List.module.css';

const List = () => {
  const { data: lists, mutate: mutateLists } = useAspidaSWR(apiClient.private.lists, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const deleteList = async (list: ListDto) => {
    await apiClient.private.lists
      ._listId(list.id)
      .$delete()
      .then((list) => mutateLists((lists) => lists?.filter((l) => l.id !== list.id)))
      .catch(catchApiErr);
  };
  return (
    <div className={styles.quizList}>
      {lists?.map((list) => (
        <div key={list.id} className={styles.quiz}>
          <div className={styles.form}>
            <div className={styles.title}>
              <span>{list.name}</span>
              <button className={styles.btn} onClick={() => deleteList(list)}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
