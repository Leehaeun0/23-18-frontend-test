import { BrowserRouter } from 'react-router-dom';
import BaseRoute from './routes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <BaseRoute />
      </BrowserRouter>
    </div>
  );
};

export default App;
