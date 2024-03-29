import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import fetchPhotos from '../helpers/api';

const App = () => {
  const [photos, setPhotos] = useState(null); // Состояние для хранения фотографий
  const [isLoading, setIsLoading] = useState(false); // Состояние для отображения индикатора загрузки
  const [error, setError] = useState(null); // Состояние для хранения сообщения об ошибке (если есть)
  const [inputValue, setInputValue] = useState(''); // Состояние для хранения поискового запроса
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Состояние для выбранного изображения

  // Функция для обработки отправки поискового запроса
  const handleSubmit = query => {
    setPhotos([]); // Очищаем фотографии перед новым поиском
    setInputValue(query); // Устанавливаем значение поискового запроса
    setCurrentPage(1); // Сбрасываем текущую страницу при новом поиске
  };

  // Функция для очистки фотографий
  // const clearPhotos = () => {
  //   setPhotos([]); // Очищаем список фотографий
  // };

  useEffect(() => {
    // Проверяем, есть ли значение в поисковом запросе
    if (!inputValue) {
      return; // Если нет, выходим из эффекта
    }

    const fetchAndSetPhotos = async () => {
      try {
        // Устанавливаем флаг загрузки в true перед запросом
        setIsLoading(true);
        // Сбрасываем сообщение об ошибке перед запросом
        setError(null);

        // Выполняем запрос к API и получаем данные
        const data = await fetchPhotos(inputValue, currentPage);

        // Обновляем фотографии, добавляя новые к текущим
        setPhotos(prevData => [...prevData, ...data.hits]);
        // Сбрасываем сообщение об ошибке
        setError(null);
      } catch (error) {
        // В случае ошибки устанавливаем сообщение об ошибке
        setError(error.message);
        // Сбрасываем фотографии в случае ошибки
        setPhotos([]);
      } finally {
        // В любом случае завершаем запрос, сбрасывая флаг загрузки
        setIsLoading(false);
      }
    };

    // Выполняем функцию fetchAndSetPhotos при изменении inputValue или currentPage
    fetchAndSetPhotos();
  }, [inputValue, currentPage]);

  // Обработчик для кнопки "Загрузить еще"
  const loadMoreImages = () => {
    setCurrentPage(currentPage + 1); // Увеличиваем текущую страницу на 1
  };

  // Обработчик клика на изображение в галерее
  const handleImageClick = selectedPhoto => {
    setSelectedPhoto(selectedPhoto); // Устанавливаем выбранное изображение
  };

  // Метод для закрытия модального окна
  const closeModal = () => {
    console.log('Closing modal'); // Выводим сообщение в консоль
    setSelectedPhoto(null); // Закрываем модальное окно
  };

  // Проверка на отсутствие фотографий
  const noPhotos = !isLoading && photos && photos.length === 0;

  return (
    <>
      {/* Компонент поисковой строки с передачей обработчиков событий */}
      <Searchbar onSearch={handleSubmit} />

      {/* Отображаем сообщение об ошибке, если ошибка не равна null */}
      {error !== null && (
        <p className="errorBage">
          Oops, some error occurred... Error message: {error}
        </p>
      )}

      {/* Отображаем индикатор загрузки, если isLoading равно true */}
      {isLoading && <Loader />}

      {/* Если переменная noPhotos имеет значение true, отображаем сообщение об извинении, что не найдено изображений по вашему запросу */}
      {noPhotos && (
        <p className="apologyMessage">
          Sorry, no images were found for your search.
        </p>
      )}

      {/* Отображаем галерею изображений, если фотографии не равны null и их количество больше 0 */}
      {photos && photos.length > 0 && (
        <>
          <ImageGallery photos={photos} onClick={handleImageClick} />

          {/* Скрываем кнопку "Загрузить еще", если количество полученных изображений не делится на 12 (т.е. остаток от деления не равен нулю). */}
          {photos && photos.length > 0 && photos.length % 12 === 0 && (
            <Button
              photos={photos}
              isLoading={isLoading}
              onLoadMore={loadMoreImages}
            />
          )}
        </>
      )}

      {selectedPhoto && ( // Если есть выбранное изображение, отображаем модальное окно
        <Modal modalData={selectedPhoto} closeModal={closeModal} />
      )}
    </>
  );
};
export default App;
