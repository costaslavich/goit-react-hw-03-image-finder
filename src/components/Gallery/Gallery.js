import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from '../PhotoCard/PhotoCard';
import styles from './Gallery.module.css';

const Gallery = ({ pictures, openModal }) => (
  <div>
    <ul className={styles.gallery}>
      {pictures.map(picture => (
        <li key={picture.id} className={styles.gallery_item}>
          <PhotoCard {...picture} openModal={() => openModal(picture.id)} />
        </li>
      ))}
    </ul>
  </div>
);

Gallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default Gallery;
