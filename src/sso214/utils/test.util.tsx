import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, CartContextProps } from '../context/CartContext';
import BaseRoute from '../routes';

function renderWithRouter(initialEntries: string[], initialState?: CartContextProps['cartList']) {
  return {
    user: userEvent.setup(),
    ...render(
      <CartProvider initialState={initialState ?? []}>
        <MemoryRouter initialEntries={['/', ...initialEntries]}>
          <BaseRoute />
        </MemoryRouter>
      </CartProvider>,
    ),
  };
}

export { renderWithRouter };
