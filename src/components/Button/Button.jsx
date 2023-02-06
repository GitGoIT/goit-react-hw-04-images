import css from './/button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ text, loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};
