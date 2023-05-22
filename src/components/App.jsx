import React, { Component } from 'react';
import api from '../services/Pixaby-api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    searchImages: '',
    page: 1,
    isLoading: false,
    showModal: false,
    modalImage: '',
    error: null,
    showLoadMoreBTN: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { searchImages, page } = this.state;
    if (prevState.searchImages !== searchImages || prevState.page !== page) {
      this.getImages(searchImages, page);
    }
  }

  onChangeImages = query => {
    this.setState({ searchImages: query, page: 1, images: [], error: null });
  };

async getImages() {
  const { searchImages, page } = this.state;
  this.setState({ isLoading: true });
  try {
    const hits = await api.fetchImages({ searchImages, page });
    this.setState(prevState => ({
      images: [...prevState.images, ...hits],
      total: hits.totalHits,
      showLoadMoreBTN: hits.length >= 12,
    }));
    if (hits.length === 0) {
      alert('Sorry, we did not find any images');
      this.setState({ showLoadMoreBTN: false });
    }
  } catch (error) {
    this.setState({ error });
  } finally {
    this.setState({ isLoading: false });
  }
};

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = largeURL => {
    this.setState({ modalImg: largeURL });
    this.toggleModal();
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeURL: ''});
  };

    render() {
    const { images, isLoading, error, showModal, modalImg, showLoadMoreBTN} =
      this.state;
    return (
      <div>
        {showModal && <Modal modalURL={modalImg} onClose={this.toggleModal} />}
        {error && <p>Oops!</p>}
        <SearchBar onSubmit={this.onChangeImages} disabled={isLoading} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal}></ImageGallery>
        )}
        {isLoading && <Loader />}
        {showLoadMoreBTN && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
