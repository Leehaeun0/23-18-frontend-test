import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Store, Option, Result, Home } from '../pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store/:storeId" element={<Store />} />
        <Route path="/store/:storeId/menu/:menuId" element={<Option />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
