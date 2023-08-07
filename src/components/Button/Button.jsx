import React from 'react';
import '../Styles/styles.css';

const Button = ({ onLoadMore, show }) => {
  return show ? (
    <div>
      <button type="button" className="Button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  ) : null;
};

export default Button;
