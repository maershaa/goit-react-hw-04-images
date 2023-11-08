import React from 'react';

export const Button = ({ onLoadMore }) => {
  return (
    <button className="LoadMoreBtn" onClick={() => onLoadMore()}>
      Load More
    </button>
  );
};

export default Button;
