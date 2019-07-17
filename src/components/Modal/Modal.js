import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default class Modal extends Component {
  static defaultProps = {
    largeImage: '',
  };

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string,
  };

  backdropRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = event => {
    if (event.code !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  handleBackDropClick = event => {
    const { current } = this.backdropRef;

    if (current && event.target !== current) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { largeImage } = this.props;
    return (
      <div
        className={styles.overlay}
        ref={this.backdropRef}
        onClick={this.handleBackDropClick}
        role="img"
        onKeyDown={this.handleKeyPress}
      >
        <div className={styles.modal}>
          <img src={largeImage} alt="random-img" />
        </div>
      </div>
    );
  }
}
