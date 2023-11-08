import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: '', // Состояние для хранения значения ввода
  };

  // Обработчик изменения значения инпута
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
    // Вызываем функцию onInputChange из родительского компонента и передаем значение ввода
  };

  // Обработчик отправки формы
  handleSubmit = event => {
    event.preventDefault();
    const { inputValue } = this.state;
    if (!inputValue) {
      alert('Please, enter find name');
    }
    // Вызываем функцию onSearch из родительского компонента для выполнения поиска
    this.props.onSearch(this.state.inputValue);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            {/* мнемоника лупа */}
            {/* <span> &#x1F50D; </span> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="buttonLabel"> Поиск</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Искать изображения и фотографии"
            value={this.state.inputValue}
            // Обновляем состояние при изменении значения инпута
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
