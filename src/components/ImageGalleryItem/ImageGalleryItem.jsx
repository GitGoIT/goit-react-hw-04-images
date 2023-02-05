import css from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ image } ) => {
 
    return (
      <li key={image.id} className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem_image}
          src={image.webformatURL}
          alt={image.tags}
          name={image.largeImageURL}
        />
      </li>
    );
};
