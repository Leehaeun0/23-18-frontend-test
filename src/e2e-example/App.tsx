import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MenuList } from '../server/data';

const Home = () => {
  const [data, setData] = useState<{ storeMenu: MenuList[] } | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/store/1234')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <p>{JSON.stringify(data?.storeMenu)}</p>
      <a href="/counter">counter</a>
    </main>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Counter</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </main>
  );
};

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
    </Routes>
  </BrowserRouter>
);
