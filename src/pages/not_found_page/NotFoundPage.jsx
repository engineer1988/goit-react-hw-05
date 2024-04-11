import { Link } from 'react-router-dom';

const NotFounPage = () => {
  return (
    <div>
      <h1>Opps, sorry :( page not found</h1>
      <Link to="/">Back to home page</Link>
    </div>
  );
};
export default NotFounPage;
