import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
      <div className="card text-center p-8">
        <h1 className="text-6xl font-bold text-[var(--text-color)] mb-4">
          404
        </h1>
        <p className="text-xl text-[var(--text-color)]/70 mb-6">
          Oops! Page not found.
        </p>
        <Link to="/" className="button button-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
