import useAspidaSWR from '@aspida/swr';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './solve.module.css';

interface ProblemProps {
  isSolveStart: boolean;
  listNameId: { id: string; name: string };
}

const Problem: React.FC<ProblemProps> = ({ isSolveStart, listNameId }) => {
  const { data: works } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const [prob, setProb] = useState(works);
  const [probNum, setProbNum] = useState(0);
  const [nowNum, setNowNum] = useState(0);
  const [ans, setAns] = useState('');

  useEffect(() => {
    if (!works) return;
    const problem = works.filter((work) => work.list === listNameId.id);
    setProb(problem);
    setProbNum(problem.length);
  }, [listNameId, works]);

  const handleNext = () => {
    if (nowNum < probNum - 1) {
      setNowNum(nowNum + 1);
    }
  };

  const handleCheck = (answer: string) => {
    if (answer === prob?.[nowNum].answer) {
      alert('正解');
      setAns('');
      handleNext();
    } else {
      alert(`不正解 \n 正解は${prob?.[nowNum]?.answer}です`);
    }
  };

  return (
    <div>
      {isSolveStart && prob && prob.length > 0 && (
        <div>
          <div className={styles.listName}>{listNameId.name}</div>
          <div>{prob[nowNum]?.quiz}</div>
          <input
            value={ans}
            className={styles.textInput}
            type="text"
            placeholder="回答を入力"
            onChange={(e) => setAns(e.target.value)}
          />
          <button onClick={() => handleCheck(ans)}>回答する</button>
        </div>
      )}
    </div>
  );
};

export default Problem;
