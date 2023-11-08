import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    // Добавляем обработчик события нажатия клавиши "Esc" при монтировании компонента
    window.addEventListener('keydown', this.handleKeyDown);
    // Запрещаем прокрутку тела документа при открытом модальном окне
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    // Удаляем обработчик события при размонтировании компонента
    window.removeEventListener('keydown', this.handleKeyDown);
    // Восстанавливаем прокрутку тела документа при закрытом модальном окне
    document.body.style.overflow = 'auto';
  }

  handleOverlayClick = event => {
    // Проверяем, было ли событие клика на самом оверлее, а не на его дочерних элементах
    if (event.target === event.currentTarget) {
      // Вызываем функцию closeModal переданную через props
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    // Проверяем, была ли нажата клавиша "Esc"
    if (event.code === 'Escape') {
      // Вызываем функцию closeModal переданную через props
      this.props.closeModal();
    }
  };

  render() {
    // Извлекаем modalData из props
    const { modalData } = this.props;

    return (
      // Добавляем обработчик клика на оверлее для закрытия модального окна
      <div onClick={this.handleOverlayClick} className="overlay">
        <div className="modal">
          <img
            // Отображаем увеличенное изображение с URL и альтернативным текстом из modalData
            src={modalData.largeImageURL}
            alt={modalData.tags}
            className="modalImage"
          />
        </div>
      </div>
    );
  }
}
