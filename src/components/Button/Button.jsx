import React from 'react';
import '../Styles/styles.css';

const Button = ({ onLoadMore, images }) => {
  return images.length > 0 ? (
    <button type="button" className="Button" onClick={onLoadMore}>
      Load more
    </button>
  ) : null;
};

export default Button;
