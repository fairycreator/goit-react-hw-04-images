import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchImages = useCallback(async () => {
    setIsLoading(true);

    try {
      const fetchedImages = await api.fetchImages(searchQuery, currentPage);
      setImages(prevImages => [...prevImages, ...fetchedImages]);
      setCurrentPage(prevPage => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setError(error);
      setIsLoading(false);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (searchQuery !== 'react') {
      setImages([]);
      setCurrentPage(1);
      fetchImages();
    }
  }, [searchQuery, fetchImages]);

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
        <Button onLoadMore={fetchImages} show={true} />
      )}
    </div>
  );
};

export default App;
