import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

function useStore() {
  const context = useContext(StoreContext);

  if (!context) throw Error('StoreContext 외부에서 호출되었습니다.');
  return context;
}

export { useStore };
