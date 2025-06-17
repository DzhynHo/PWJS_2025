import React from "react";
import "../pages/style/FavoritesPage.css";
import { useLanguage } from "../pages/LanguageContext";

export default function FavoritePage({ songs = [] }) {
  // Отримуємо поточну мову з контексту (ua або pl)
  const { language } = useLanguage();

  // Фільтруємо список пісень, залишаючи лише ті, які позначено як улюблені (liked === true)
  const favoriteSongs = songs.filter(song => song.liked === true);

  // Тексти інтерфейсу для різних мов (українська та польська)
  const texts = {
    ua: {
      title: "Улюблені Пісні",
      noFavorites: "У вас ще немає улюблених пісень.",
      audioNotSupported: "Ваш браузер не підтримує елемент audio.",
    },
    pl: {
      title: "Ulubione Piosenki",
      noFavorites: "Nie masz jeszcze ulubionych piosenek.",
      audioNotSupported: "Twoja przeglądarka nie obsługuje elementu audio.",
    },
  };

  // Вибір текстів відповідно до активної мови або за замовчуванням — українська
  const t = texts[language] || texts.ua;

  return (
    <div className="favorite-container">
      {/* Заголовок сторінки */}
      <h2 className="favorite-title">{t.title}</h2>

      {/* Якщо улюблених пісень немає — показуємо повідомлення */}
      {favoriteSongs.length === 0 ? (
        <p>{t.noFavorites}</p>
      ) : (
        // Якщо є улюблені пісні — рендеримо їх у вигляді списку
        <div className="favorite-list">
          {favoriteSongs.map((song) => (
            // ВАЖЛИВО: використовуємо song.id як key (а не index), щоб React правильно оновлював DOM
            <div key={song.id} className="favorite-item">
              {/* Обкладинка пісні або placeholder, якщо зображення немає */}
              <img
                src={song.image || "https://via.placeholder.com/60"}
                alt={song.title}
                className="favorite-img"
              />

              {/* Інформація про пісню: назва та виконавець */}
              <div className="favorite-info">
                <h4 className="favorite-title-song">{song.title}</h4>
                <p className="favorite-artist">{song.artist}</p>
              </div>

              {/* Аудіоплеєр для прослуховування пісні */}
              <audio controls className="favorite-audio">
                <source src={song.file} type="audio/mpeg" />
                {/* Повідомлення, якщо браузер не підтримує <audio> */}
                {t.audioNotSupported}
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
