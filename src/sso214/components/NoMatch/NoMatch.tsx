import { Link } from 'react-router-dom';
import { TEST_ID } from '../../constant/TEST_ID';

const NoMatch = () => {
  return (
    <div data-testid={TEST_ID.NO_MATCH.NO_MATCH}>
      <h1>404</h1>
      <p>Nothing to see here!</p>
      <button>
        <Link to="/">Go to the home page</Link>
      </button>
    </div>
  );
};

export default NoMatch;
