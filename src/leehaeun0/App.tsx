import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StorePage from './pages/MenuDetailPage/StorePage';
import MenuDetailPage from './pages/MenuDetailPage/MenuDetailPage';
import { MENU_DATA } from './mocks/menu';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store/:storeId" element={<StorePage data={MENU_DATA} />} />
        <Route path="/store/:storeId/menu/:menuId" element={<MenuDetailPage data={MENU_DATA.menus[0]} />} />
      </Routes>
    </BrowserRouter>
  );
}
