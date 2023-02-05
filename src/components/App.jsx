import { Component } from "react";


import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Loader } from './Loader/Loader.jsx';

import { fetchImages } from '../api/fetchImages.js'




export class App extends Component {
  state = {
    search: "",
    images: [],
    onLoading: false,
    error: null,
  };

  searchImages = (search) => {
    this.setState(search);
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (prevState.search !== search) {
      this.setState({ onLoading: true });
         fetchImages(search)
           .then(data => this.setState({ images: data.hits }))
           .catch(error => this.setState({ error: error.message }))
           .finally(() => this.setState({ onLoading: false }));
    }
  }

  render() {
    const { images, onLoading, error } = this.state;
    const { searchImages } = this;

    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={searchImages} />
        <ImageGallery images={images} />
        {onLoading && <Loader />}
        {error && <p>Something goes wrong. Please try again later.</p>}
      </div>
    );
  }
};
