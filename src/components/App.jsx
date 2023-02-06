import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { ModalImage } from './Modal/ModalImage.jsx';
import { fetchApi } from '../api/fetchApi.js';

export class App extends Component {
  state = {
    search: '',
    images: [],
    onLoading: false,
    error: null,
    page: 1,
    showModal: false,
    currentImage: null,
  };

  searchImages = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = ({ tags, largeImageURL }) => {
    this.setState({
      currentImage: {
        tags,
        largeImageURL,
      },
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      currentImage: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ onLoading: true });
      const { search, page } = this.state;
      const data = await fetchApi(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ onLoading: false });
    }
  }

  render() {
    const { images, onLoading, error, showModal, currentImage } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={searchImages} />
        <ImageGallery images={images} showImage={showImage} />
        {error && (
          <p
            style={{
              fontSize: '24px',
              textAlign: 'center',
              color: 'red',
            }}
          >
            Something goes wrong. Please try again later.
          </p>
        )}
        {onLoading && <Loader />}
        {Boolean(images.length) && (
          <Button text="Load more" loadMore={loadMore} />
        )}
        {showModal && (
          <Modal closeModal={closeModal}>
            <ModalImage {...currentImage} />
          </Modal>
        )}
      </div>
    );
  }
}
