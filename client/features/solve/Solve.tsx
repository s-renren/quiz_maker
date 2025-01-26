import useAspidaSWR from '@aspida/swr';
import { useCatchApiErr } from 'hooks/useCatchApiErr';
import React, { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './solve.module.css';

interface Option {
  id: string;
  name: string;
}

export const Solve = () => {
  const [listName, setListName] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [, setArrowActive] = useState(false);
  const [id, setId] = useState('');
  const [isSolveStart, setIsSolveStart] = useState(false);
  const { data: works } = useAspidaSWR(apiClient.private.works, {
    refreshInterval: 5000,
  });
  const { data: name } = useAspidaSWR(apiClient.private.lists, {
    refreshInterval: 5000,
  });
  const catchApiErr = useCatchApiErr();

  const getAllList = async () => {
    const res = await apiClient.private.lists.$get();
    const mappedOptions = res.map((item: { id: string; name: string }) => ({
      id: item.id,
      name: item.name,
    }));
    setOptions(mappedOptions);
  };
  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selected = options.find((option) => option.id === selectedValue);
    setListName(selected || null);
  };
  const getId = () => {
    
  }

  const handleSolveStart = () => {
    if (listName === null || isSolveStart) return;
    setIsSolveStart(true);
  };

  useEffect(() => {
    getAllList();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.btnList}>
        <div className={styles.makeQuiz}>
          <a href="/makeQuiz" className={styles.makeBtn}>
            問題を作成する
          </a>
        </div>
        <div className={styles.makeQuiz}>
          <a href="/makeList" className={styles.makeBtn}>
            リストを作成する
          </a>
        </div>
        <div className={styles.makeQuiz}>
          <a href="/solve" className={styles.makeBtn}>
            問題を解く
          </a>
        </div>
      </div>
      <div className={styles.listName}>
        <p>リストを選択</p>
      </div>
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
        <button type="button" onClick={handleSolveStart} className={styles.selectBtn}>
          問題を解く
        </button>
      </div>
      {isSolveStart && <div>問題を解く準備ができました！</div>}
    </div>
  );
};
