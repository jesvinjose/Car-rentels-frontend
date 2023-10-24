import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="display-4">404 - Page Not Found</h1>
          <p className="lead">The page you are looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Go back to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
