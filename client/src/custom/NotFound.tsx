import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center text-center my-44">
        <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mb-8 text-lg">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-4 py-2 font-bold text-white btn btn-neutral"
        >
          Go back to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;