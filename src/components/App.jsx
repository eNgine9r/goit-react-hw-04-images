import React, { useState, useEffect } from 'react';
import api from '../services/Pixaby-api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchImages, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setOnLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setUrlModal] = useState('');
  const [error, setError] = useState('');
  const [showLoadMoreBTN, setShowBtn] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const onChangeImages = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setIsInitialLoad(false);
  };

useEffect(() => {
  const getImages = async () => {
    setOnLoading(true);
    try {
      const newImages = await api.fetchImages({ searchImages, page });
      setImages(prevImages => [...prevImages, ...newImages]);
      setShowBtn(newImages.length >= 12);
      if (newImages.length === 0) {
        alert('Sorry, we did not find any images');
        setShowBtn(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setOnLoading(false);
    }
  };

  if (!isInitialLoad) {
    getImages();
  }
}, [searchImages, page, isInitialLoad]);


  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = largeURL => {
    setUrlModal(largeURL);
    toggleModal();
  };

  return (
    <div>
      {showModal && <Modal modalURL={modalImage} onClose={toggleModal} />}
      {error && <p>Oops!</p>}
      <SearchBar onSubmit={onChangeImages} disabled={isLoading} />
      {!isInitialLoad && images.length !== 0 && (
        <ImageGallery
          images={images}
          openModal={openModal}
          onLoadMore={onLoadMore}
          keyExtractor={image => image.id} // Унікальний ключ для кожного елемента
        />
      )}
      {isLoading && <Loader />}
      {!isInitialLoad && showLoadMoreBTN && <Button onLoadMore={onLoadMore} />}
    </div>
  );
}
