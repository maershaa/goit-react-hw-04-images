import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import fetchPhotos from '../helpers/api';

class App extends Component {
  state = {
    photos: null, // Состояние для хранения фотографий
    isLoading: false, // Состояние для отображения индикатора загрузки
    error: null, // Состояние для хранения сообщения об ошибке (если есть)
    inputValue: '', // Состояние для хранения поискового запроса
    currentPage: 1, //  состояние для текущей страницы
    selectedPhoto: null, //  состояние для выбранного изображения
  };

  // Обработчик изменения значения поискового запроса

  handleSubmit = query => {
    this.setState({ photos: [] });
    this.setState({ inputValue: query, currentPage: 1 });
  };

  clearPhotos = () => {
    this.setState({ photos: [] });
  };

  // Функция для выполнения запроса и обновления фотографий
  async fetchAndSetPhotos(inputValue, currentPage = 1) {
    try {
      // Устанавливаем isLoading в true перед началом запроса
      this.setState({ isLoading: true, error: null });

      // Выполняем запрос к API с переданным поисковым запросом и номером страницы
      const data = await fetchPhotos(inputValue, currentPage);

      // При успешном запросе, добавляем новые фотографии к текущим
      const currentPhotos = this.state.photos || []; // Существующие фотографии
      const newPhotos = data.hits; // Новые фотографии

      const updatedPhotos = [...currentPhotos, ...newPhotos]; // Объединяем их

      this.setState({ photos: updatedPhotos, error: null });
    } catch (error) {
      // В случае ошибки сохраняем сообщение об ошибке и очищаем фотографии
      this.setState({ error: error.message, photos: null });
    } finally {
      // В любом случае завершаем запрос, сбрасывая флаг isLoading
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(_, prevState) {
    const { inputValue, currentPage } = this.state;
    if (
      prevState.inputValue !== this.state.inputValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchAndSetPhotos(inputValue, currentPage);
      // Очистить список фотографий перед выполнением нового запроса
      this.clearPhotos();
    }
  }

  // Обработчик для кнопки "Загрузить еще"
  loadMoreImages = () => {
    // Увеличиваем текущую страницу на 1
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    })); // Обновляем текущую страницу
  };

  // Обработчик клика на изображение в галерее
  handleImageClick = selectedPhoto => {
    this.setState({ selectedPhoto });
  };

  // Метод для закрытия модального окна
  closeModal = () => {
    console.log('Closing modal');
    this.setState({ selectedPhoto: null });
  };

  render() {
    // Деструктуризация для упрощения доступа к состояниям
    const { error, isLoading, photos, selectedPhoto } = this.state;
    const noPhotos = photos && photos.length === 0;

    return (
      <>
        {/* Компонент поисковой строки с передачей обработчиков событий */}
        <Searchbar onSearch={this.handleSubmit} />

        {/* Отображаем сообщение об ошибке, если ошибка не равна null */}
        {error !== null && (
          <p className="errorBage">
            Oops, some error occurred... Error message: {error}
          </p>
        )}

        {/* Отображаем индикатор загрузки, если isLoading равно true */}
        {isLoading && <Loader />}

        {/* Если переменная noPhotos имеет значение true, отображаем сообщение об извинении, что не найдено изображений по вашему запросу */}
        {noPhotos && !isLoading && (
          <p className="apologyMessage">
            Sorry, no images were found for your search.
          </p>
        )}

        {/* Отображаем галерею изображений, если фотографии не равны null и их количество больше 0 */}
        {photos && photos.length > 0 && (
          <>
            <ImageGallery photos={photos} onClick={this.handleImageClick} />

            {/* скрывает кнопку "Загрузить еще", если количество полученных изображений не делится на 12 (т.е. остаток от деления не равен нулю). */}
            {photos && photos.length > 0 && photos.length % 12 === 0 && (
              <Button
                photos={photos}
                isLoading={isLoading}
                onLoadMore={this.loadMoreImages}
              />
            )}
          </>
        )}

        {selectedPhoto && ( // Если есть выбранное изображение, отображаем модальное окно
          <Modal modalData={selectedPhoto} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

export default App;
