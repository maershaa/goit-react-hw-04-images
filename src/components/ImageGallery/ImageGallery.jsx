import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ photos, onClick }) => (
  <ul className="imageGallery">
    {photos.map(photo => (
      <ImageGalleryItem
        key={photo.id}
        largeImageURL={photo.largeImageURL}
        webformatURL={photo.webformatURL}
        tags={photo.tags}
        onClick={onClick} // Передача обработчика клика в компонент ImageGalleryItem
      />
    ))}
  </ul>
);

export default ImageGallery;
