import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { CartContext, CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import BaseRoute from '../route';

export const renderWithRouter = (initialEntries = ['/'], cartProvider?: CartContext) => {
  return {
    user: userEvent.setup(),
    ...render(
      <CartProvider initialState={cartProvider}>
        <MemoryRouter initialEntries={initialEntries}>
          <BaseRoute />
        </MemoryRouter>
      </CartProvider>,
    ),
  };
};

export const noop = () => console.log('noop');
