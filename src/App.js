import React, { Component } from "react";
import axios from "axios";
import "./App.css";

// Замінимо це на ваш ключ доступу до Unsplash API
const ACCESS_KEY = "lloVUz0JSKBcHp4kfEjx9UXRupHplQYhoh7bLRBOWtc";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: "",
  };

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    const { query } = this.state;

    if (!query) return; // Перевірка на порожній запит

    this.setState({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query },
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      this.setState({ images: response.data.results });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, error, query } = this.state;

    return (
      <div>
        <h1>Пошук зображень</h1>
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          placeholder="Введіть тему"
        />
        <button onClick={this.handleSearch}>Шукати</button>

        {error && <p>Упс, щось пішло не так: {error.message}</p>}
        {isLoading && <p>Завантаження...</p>}

        <div className="image-grid">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
