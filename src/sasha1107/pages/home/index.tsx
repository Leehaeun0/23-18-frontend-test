import { Link } from 'react-router-dom';
import data from '../../constants/data.json';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {data.map(({ storeId, title }) => (
          <li key={storeId}>
            <Link to={`/store/${storeId}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
