import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';

export const ImageGallery = ({ images }) => {

return (
  <ul className={css.ImageGallery}>
    {images.map((image, index) => (
      <ImageGalleryItem image={image} key={index} />
    ))}
  </ul >
      )
};
