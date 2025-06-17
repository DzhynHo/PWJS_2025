import React, { useState, useMemo } from "react";
import "../pages/style/AllSongsPage.css";
import { useLanguage } from "../pages/LanguageContext";

export default function AllSongsPage({ songs = [], toggleLike }) {
  // Отримуємо поточну мову з контексту
  const { language } = useLanguage();

  // Локальний стан для пошукового рядка
  const [searchTerm, setSearchTerm] = useState("");
  // Локальний стан для вибору жанру (фільтрації)
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Тексти для двох мов, для локалізації
  const texts = {
    ua: {
      title: "Всі Пісні",
      searchPlaceholder: "Пошук за назвою або виконавцем...",
      allGenres: "Всі жанри",
      noSongs: "Немає пісень, що відповідають критеріям пошуку.",
      audioNotSupported: "Ваш браузер не підтримує елемент audio.",
    },
    pl: {
      title: "Wszystkie Piosenki",
      searchPlaceholder: "Szukaj według tytułu lub artysty...",
      allGenres: "Wszystkie gatunki",
      noSongs: "Brak piosenek spełniających kryteria wyszukiwania.",
      audioNotSupported: "Twoja przeglądarka nie obsługuje elementu audio.",
    },
  };

  // Вибираємо текст відповідно до мови, дефолт - українська
  const t = texts[language] || texts.ua;

  /**
   * Формуємо унікальний список жанрів на основі пісень.
   * Використовуємо useMemo для оптимізації: 
   * жанри перераховуються лише при зміні songs.
   * Додаємо "all" для вибору всіх жанрів.
   */
  const genres = useMemo(() => {
    const uniqueGenres = new Set(songs.map(song => song.genre));
    return ["all", ...Array.from(uniqueGenres)];
  }, [songs]);

  /**
   * Фільтруємо пісні за обраним жанром і пошуковим запитом.
   * useMemo - щоб не фільтрувати зайвий раз без потреби.
   */
  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      // Перевірка по жанру: або вибрано "all", або співпадає з жанром пісні
      const matchesGenre = selectedGenre === "all" || song.genre === selectedGenre;

      // Перевірка пошуку: чи міститься пошуковий рядок у назві або в артистові (без урахування регістру)
      const matchesSearch =
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesGenre && matchesSearch;
    });
  }, [songs, selectedGenre, searchTerm]);

  return (
    <div className="all-songs-container">
      {/* Заголовок сторінки */}
      <h2>{t.title}</h2>

      {/* Панель управління: пошук і вибір жанру */}
      <div className="controls">
        {/* Пошуковий інпут */}
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Селект для вибору жанру */}
        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          className="genre-select"
        >
          {/* Опції для жанрів */}
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre === "all" ? t.allGenres : genre}
            </option>
          ))}
        </select>
      </div>

      {/* Список відфільтрованих пісень */}
      <ul className="songs-list">
        {filteredSongs.length === 0 ? (
          // Якщо пісень немає — показуємо повідомлення
          <p>{t.noSongs}</p>
        ) : (
          filteredSongs.map((song) => (
            <li key={song.id} className="song-item">
              {/* Обкладинка пісні */}
              <img
                src={song.image || "https://via.placeholder.com/60"}
                alt={song.title}
                className="song-img"
              />
              {/* Інформація про пісню */}
              <div className="song-info">
                <h3 className="song-title">{song.title}</h3>
                <p className="song-artist">{song.artist}</p>
                <p className="song-genre">{song.genre}</p>
                {/* Відтворювач аудіо */}
                <audio controls className="song-audio">
                  <source src={song.file} type="audio/mpeg" />
                  {t.audioNotSupported}
                </audio>
              </div>

              {/* Кнопки лайку / дизлайку */}
              <div className="like-buttons">
                {/* Лайк - червоне серце, якщо liked=true додаємо клас для стилю */}
                <button
                  className={`like-btn ${song.liked ? "liked" : ""}`}
                  onClick={() => toggleLike(song.id, true)}
                >
                  ❤️
                </button>

                {/* Дизлайк - хрестик, якщо liked=false додаємо клас */}
                <button
                  className={`dislike-btn ${song.liked === false ? "disliked" : ""}`}
                  onClick={() => toggleLike(song.id, false)}
                >
                  ❌
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
