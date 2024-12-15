import { useCallback } from 'react';
import { useAlert } from './useAlert';

export const useCatchApiErr = () => {
  const { setAlert } = useAlert();

  return useCallback(async () => {
    await setAlert('サーバーでエラーが発生しました。 \n時間を空けてご利用ください。');
    return null;
  }, [setAlert]);
};
