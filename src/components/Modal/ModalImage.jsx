import PropTypes from 'prop-types';

export const ModalImage = ({ tags, largeImageURL }) => {
  return <img src={largeImageURL} alt={tags}></img>;
};

ModalImage.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
