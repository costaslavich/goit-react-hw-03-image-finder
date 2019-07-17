import React, { Component } from 'react';
import LazyLoad from 'react-lazy-load';
import Modal from './components/Modal/Modal';
import SearchForm from './components/SearchForm/SearchForm';
import ErrorNotification from './components/ErrorNotification/ErrorNotification';
import Gallery from './components/Gallery/Gallery';
import { fetchPictures } from './service/pixabay-api';
import styles from './styles.module.css';

const mapperHelper = items =>
  items.map(({ id, webformatURL, largeImageURL, likes, views, downloads }) => ({
    id,
    webformatURL,
    largeImageURL,
    likes,
    views,
    downloads,
  }));

export default class App extends Component {
  state = {
    pictures: [],
    query: '',
    pageNumber: 1,
    isLoading: false,
    error: false,
    isModalOpen: false,
    largeImageURL: null,
  };

  componentDidMount() {
    this.fetchPicture({ query: 'alexander', pageNumber: 1 });
  }

  componentDidUpdate(prevState) {
    const { pictures } = this.state;

    if (prevState.pictures !== pictures) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchPicture = ({ query, pageNumber }) => {
    this.setState({ isLoading: true });

    fetchPictures(query, pageNumber)
      .then(({ data }) => {
        this.setState({
          pictures: mapperHelper(data.hits),
          pageNumber: pageNumber + 1,
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState({
          isLoading: false,
        }),
      );
  };

  handleClickMorePicture = () => {
    const { query, pageNumber } = this.state;

    fetchPictures(query, pageNumber)
      .then(({ data }) => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...mapperHelper(data.hits)],
          pageNumber: prevState.pageNumber + 2,
        }));
      })
      .catch(error => this.setState({ error }));
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  // handleChangeImg = id => this.state.pictures.find(item => item.id === id);
  handleChangeImg = url => {
    this.setState({ largeImageURL: url });
  };

  render() {
    const {
      error,
      pictures,
      isModalOpen,
      isLoading,
      largeImageURL,
    } = this.state;

    return (
      <div className={styles.app}>
        <SearchForm onSubmit={this.fetchPicture} />
        {isLoading && (
          <LazyLoad
            height={762}
            throttle={250}
            debounce={false}
            offsetVertical={300}
          >
            <img
              src="http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg"
              alt="Lazy Load Example"
            />
          </LazyLoad>
        )}
        {pictures.length > 0 && (
          <Gallery pictures={pictures} openModal={this.openModal} />
        )}
        {pictures.length > 0 && (
          <button
            type="button"
            className={styles.button}
            onClick={this.handleClickMorePicture}
          >
            Load more
          </button>
        )}
        {isModalOpen && (
          <Modal onClose={this.closeModal} largeImage={largeImageURL} />
        )}
        {error && <ErrorNotification text={error.message} />}
      </div>
    );
  }
}

// {isLoading && (
//   <LazyLoad
//     height={762}
//     throttle={250}
//     debounce={false}
//     offsetVertical={300}
//   >
//     <img
//       src="http://apod.nasa.gov/apod/image/1502/ToadSky_Lane_1080_annotated.jpg"
//       alt="Lazy Load Example"
//     />
//   </LazyLoad>
