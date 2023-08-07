import React from 'react';
import '../Styles/styles.css';

const Button = ({ onLoadMore }) => {
  return (
    <div>
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default Button;
