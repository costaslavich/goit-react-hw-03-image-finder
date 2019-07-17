import React from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css';

const PhotoCard = ({
  webformatURL,
  likes,
  views,
  comments,
  downloads,
  openModal,
}) => (
  <div className={styles.photo_card}>
    <img src={webformatURL} alt="random-img" />

    <div className={styles.stats}>
      <p className={styles.stats_item}>
        <i className="material-icons">thumb_up</i>
        {likes}
      </p>
      <p className={styles.stats_item}>
        <i className="material-icons">visibility</i>
        {views}
      </p>
      <p className={styles.stats_item}>
        <i className="material-icons">comment</i>
        {comments}
      </p>
      <p className={styles.stats_item}>
        <i className="material-icons">cloud_download</i>
        {downloads}
      </p>
    </div>

    <button
      type="button"
      className={styles.fullscreen_button}
      onClick={openModal}
    >
      <i className="material-icons">zoom_out_map</i>
    </button>
  </div>
);

PhotoCard.defaultProps = {
  comments: 129,
};

PhotoCard.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  comments: PropTypes.number,
  downloads: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default PhotoCard;
