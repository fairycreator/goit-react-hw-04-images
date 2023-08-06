import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import api from '../Api/Api';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        const data = await api.fetchImages(searchName, currentPage);

        if (data.length === 0) {
          console.log('Sorry, image not found...');
        } else {
          const fetchedImages = data.map(item => ({
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
          }));

          setImages(prevImages => [...prevImages, ...fetchedImages]);
        }
      } catch (error) {
        console.log('Something went wrong:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, currentPage]);

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setModalImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onClick={handleImageClick} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal largeImageURL={modalImageURL} onClose={closeModal} />
      )}
      {images.length > 0 && (
        <Button onLoadMore={() => setCurrentPage(prevPage => prevPage + 1)} />
      )}
    </div>
  );
};

export default App;
