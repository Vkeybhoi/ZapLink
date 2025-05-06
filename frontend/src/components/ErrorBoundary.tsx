import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
          <div className="card text-center p-8">
            <h1 className="text-4xl font-bold text-[var(--text-color)] mb-4">
              Something Went Wrong
            </h1>
            <p className="text-lg text-[var(--text-color)]/70 mb-6">
              An unexpected error occurred. Please try again.
            </p>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="button button-primary"
            >
              Go to Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
