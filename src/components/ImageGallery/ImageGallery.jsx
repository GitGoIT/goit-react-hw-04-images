import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, showImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          tags={tags}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          showImage={showImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
  showImage: PropTypes.func.isRequired,
};
