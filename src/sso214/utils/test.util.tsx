import React from 'react';
import { MemoryRouter } from 'react-router';
import BaseRoute from '../routes';

function renderWithRouter(ui: React.ReactElement) {
  return (
    <MemoryRouter initialEntries={['/']}>
      <BaseRoute />
      {ui}
    </MemoryRouter>
  );
}

export { renderWithRouter };
