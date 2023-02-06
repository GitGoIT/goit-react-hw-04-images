import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  showImage,
}) => {
  return (
    <li
      onClick={() => showImage({ tags, largeImageURL })}
      key={id}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        name={largeImageURL}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showImage: PropTypes.func.isRequired,
};
