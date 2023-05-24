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
