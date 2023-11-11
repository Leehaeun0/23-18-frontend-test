import { CartProvider } from './context/CartContext';
import BaseRoute from './route';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <BaseRoute />
        </CartProvider>
      </Router>
    </div>
  );
}
