import React from 'react';
import { nanoid } from 'nanoid';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import '../Styles/styles.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={nanoid()} image={image} onClick={onClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
