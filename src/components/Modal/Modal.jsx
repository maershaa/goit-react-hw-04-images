import React, { useEffect } from 'react';

const Modal = ({ modalData, closeModal }) => {
  const handleOverlayClick = event => {
    // Проверяем, было ли событие клика на самом оверлее, а не на его дочерних элементах
    if (event.target === event.currentTarget) {
      // Вызываем функцию closeModal переданную через props
      closeModal();
    }
  };

  // componentDidMount()
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  return (
    // Добавляем обработчик клика на оверлее для закрытия модального окна
    <div onClick={handleOverlayClick} className="overlay">
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
};

export default Modal;
