import { useState, memo } from 'react';
import css from './/searchbar.module.css';
import PropTypes from 'prop-types';

const initialState = {
  search: '',
};

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState }); // reset function
  };

  const { search } = state;
  
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          value={search}
          onChange={handleChange}
          className={css.SearchForm_input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default memo(Searchbar);           // add optimization memo

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
