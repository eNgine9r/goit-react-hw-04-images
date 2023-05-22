import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Button.module.css';

class Button extends Component {
  render() {
    return (
      <button className={css.Button} type="button" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;

Button.prototypes = {
  onClick: PropTypes.func.isRequired,
};