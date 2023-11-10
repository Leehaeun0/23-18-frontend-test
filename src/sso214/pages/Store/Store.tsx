import { Outlet } from 'react-router-dom';
import { StoreProvider } from '../../context/StoreContext';

const Store = () => {
  return (
    <StoreProvider>
      <Outlet />
    </StoreProvider>
  );
};

export default Store;
