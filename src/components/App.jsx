import { useState, useEffect, useCallback } from 'react';
import  Searchbar  from  './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { ModalImage } from './Modal/ModalImage.jsx';
import { fetchApi } from '../api/fetchApi.js';

export const App = () => {
  const [searchState, setSearchState] = useState('');
  const [images, setImages] = useState([]);
  const [onLoading, setOnLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [totalImages, setTotalImages] = useState(null);

  useEffect(() => {
    if (searchState) {                        // checking if search not empty (true), then call fetch
      const fetchImages = async () => {
        try {
          setOnLoading(true);
          const data = await fetchApi(searchState, page);
          const images = data.hits;
          setImages(prevImages => [...prevImages, ...images]);
          setTotalImages(data.totalHits);     // add totalImages in state for button hiding if it length < 12
        } catch (error) {
          setError(error.message);
        } finally {
          setOnLoading(false);
        }
      };
      fetchImages();
    }
  }, [searchState, page, setOnLoading, setImages, setTotalImages, setError]);

  const searchImages = useCallback(
    ({ search }) => {
      if (search.trim() === '') {
        alert('Enter a search images or photos');
        return;
      }
      if (search === searchState) {
        alert('Same request. Enter a new search images or photos');
        return;
      }
      setSearchState(search);
      setImages([]);
      setPage(1);
    }, [searchState]);

  const showImage = useCallback(data => {
    setCurrentImage(data);
    setShowModal(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setCurrentImage(null);
  }, []);

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
      {Boolean(images.length) && totalImages > images.length && (
        <Button text="Load more" loadMore={loadMore} />
      )}
      {showModal && (
        <Modal closeModal={closeModal}>
          <ModalImage {...currentImage} />
        </Modal>
      )}
    </div>
  );
};
