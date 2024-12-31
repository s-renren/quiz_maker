import useAspidaSWR from '@aspida/swr';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './QuizInList.module.css';

const QuizInList = () => {
  const { data: works } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const { data: name } = useAspidaSWR(apiClient.private.lists, {
    refreshInterval: 5000,
  });
  const [listName, setListName] = useState('');
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (name) {
      const list = name.find((list) => list.id === id);
      if (list) {
        setListName(list.name);
      }
    }
  }, [name, id]);

  return (
    <div className={styles.main}>
      <div className={styles.listName}>{listName}</div>
      {works
        ?.filter((list) => list.list === id)
        .map((work) => (
          <div key={work.id} className={styles.quiz}>
            <div className={styles.form}>
              <div className={styles.title}>
                <span>{work.quiz}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuizInList;
