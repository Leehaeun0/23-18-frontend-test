import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Store from '../pages/Store';
import StoreDetail from '../pages/Store/StoreDetail';
import SelectOption from '../pages/Store/SelectOption';

export default function BaseRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/store" element={<Store />}>
        <Route path=":storeId" element={<StoreDetail />} />
        <Route path=":storeId/menu/:menuId" element={<SelectOption />} />
      </Route>
    </Routes>
  );
}
