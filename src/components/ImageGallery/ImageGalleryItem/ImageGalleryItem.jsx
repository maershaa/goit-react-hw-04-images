import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  handleImageClick = () => {
    const { webformatURL, tags, largeImageURL } = this.props;
    this.props.onClick({ webformatURL, tags, largeImageURL });
  };

  render() {
    const { webformatURL, tags } = this.props;

    return (
      <li className="imageGalleryItem" onClick={this.handleImageClick}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}
