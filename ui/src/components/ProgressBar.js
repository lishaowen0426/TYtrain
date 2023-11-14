import React from 'react';
import '../css/ProgressBar.css';

const ProgressBar = ({ completed }) => {
  // Ensure that "completed" is not greater than 100
  const percentage = Math.min(completed, 100);

  return (
    <div className="progress">
      <div
        className={`progress-bar progress-bar-striped progress-bar-animated ${percentage >= 100 ? 'bg-success' : 'bg-info'}`}
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;