import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import css from './Button.module.css';

export default function  Button({ onLoadMore, loading }) {
  return (
      <>
        <button type="button" className={css.Button} onClick={onLoadMore}>
          {loading ? <Loader /> : 'Load more'}
        </button>
      </>
      
    );
  }

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};