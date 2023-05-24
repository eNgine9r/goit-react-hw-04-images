import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [image, setQuery] = useState('');

  const handleChange = e => {
    const query = e.currentTarget.value.trim().toLowerCase();
    setQuery(query);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (image === '') {
      return alert('Sorry. There are no images...');
    }
    onSubmit(image);
    setQuery('');
  };


  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm__button}>
          <span className={css.SearchForm__buttonLabel}>Search</span>
        </button>
        <input
          className={css.SearchForm__input}
          type="text"
          placeholder="Search images and photos"
          value={image}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
