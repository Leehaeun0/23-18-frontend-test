import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <h1>Home</h1>
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
