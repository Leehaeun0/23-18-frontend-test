import { http, HttpResponse } from 'msw';
import { server } from './server/mockServer';
import { render, screen } from '@testing-library/react';
import { FetchExample } from './FetchExample';

describe('FetchExample', () => {
  it('api 응답에 있는 메뉴 목록 타이틀이 화면에 보여야 한다.', async () => {
    render(<FetchExample />);

    expect(await screen.findByText('토핑')).toBeInTheDocument();
  });

  it('api 응답값 중 메뉴목록 타이틀이 "맛있는 토핑"이면, "맛있는 토핑"이 화면에 보여야 한다.', async () => {
    server.use(
      http.get('/api/store/:storeId', () => {
        return HttpResponse.json({
          storeMenu: [
            {
              id: 'id',
              title: '맛있는 토핑',
            },
          ],
        });
      }),
    );

    render(<FetchExample />);

    expect(await screen.findByText('맛있는 토핑')).toBeInTheDocument();
  });
});
