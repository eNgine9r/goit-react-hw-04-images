import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    image: '',
  };

  handleChange = e => {
    const query = e.currentTarget.value.trim().toLowerCase();
    this.setState({ image: query });
  };

  onSubmit = evt => {
    evt.preventDefault();
    if (this.state.image === '') {
      return alert('Sorry. There are no images...');
    }
    this.props.onSubmit(this.state.image);
    this.setState({ image: '' });
  };
  render() {
    const { image } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <span className={css.SearchForm__buttonLabel}>Search</span>
          </button>
          <input
            className={css.SearchForm__input}
            type="text"
            placeholder="Search images and photos"
            value={image}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};