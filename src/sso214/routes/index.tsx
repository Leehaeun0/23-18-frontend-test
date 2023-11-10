import { Routes, Route } from 'react-router-dom';
import { CustomLayout, CustomNoMatch } from '../components';
import { Home, Store, StoreDetail, StoreOption } from '../pages';

const BaseRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />}>
          <Route path=":storeId" element={<StoreDetail />} />
          <Route path=":storeId/menu/:menuId" element={<StoreOption />} />
        </Route>
        <Route path="*" element={<CustomNoMatch />} />
      </Route>
    </Routes>
  );
};

export default BaseRoute;
