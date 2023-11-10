import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Nothing to see here!</p>
      <button>
        <Link to="/">Go to the home page</Link>
      </button>
    </div>
  );
};

export default NoMatch;
