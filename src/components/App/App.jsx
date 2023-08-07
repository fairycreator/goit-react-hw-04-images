import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import api from '../Api/Api';
import '../Styles/styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('react');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function addImages() {
      if (searchQuery === '') {
        return;
      }

      setIsLoading(true);
      try {
        const data = await api.fetchImages(searchQuery, currentPage);

        if (data.length === 0) {
          setIsError(true);
          setError(new Error('No images found'));
        } else {
          setIsError(false);
          setError(null);
          const fetchedImages = data.map(item => ({
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
          }));
          setImages(prevImages => [...prevImages, ...fetchedImages]);
        }
      } catch (error) {
        setIsError(true);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
  }, [searchQuery]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {isError && <div>Error: {error.message}</div>}
      <ImageGallery images={images} onClick={handleImageClick} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal largeImageURL={modalImageURL} onClose={closeModal} />
      )}
      {images.length > 0 && !isLoading && !isError && (
        <Button onLoadMore={() => setCurrentPage(prevPage => prevPage + 1)} />
      )}
    </div>
  );
};

export default App;
