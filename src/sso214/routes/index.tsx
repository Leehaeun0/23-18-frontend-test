import { Routes, Route } from 'react-router-dom';
import { CustomLayout, CustomNoMatch } from '../components';
import { Home, Store, StoreDetail, StoreSelectOption } from '../pages';

const BaseRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomLayout />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="store/:storeId" element={<StoreDetail />} />
        <Route path="store/:storeId/menu/:menuId" element={<StoreSelectOption />} />
        <Route path="*" element={<CustomNoMatch />} />
      </Route>
    </Routes>
  );
};

export default BaseRoute;
