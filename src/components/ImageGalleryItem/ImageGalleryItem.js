import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  openModal
}) {
  
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem__image}
        src={webformatURL}
        data-large={largeImageURL}
        alt={tags}
        onClick={event => {
          openModal(event.target.dataset.large);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};