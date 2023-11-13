import { BrowserRouter } from 'react-router-dom';
import BaseRoute from './routes';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <BaseRoute />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
