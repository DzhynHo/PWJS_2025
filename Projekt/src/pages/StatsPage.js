import React from "react";
import "./style/StatsPage.css";
import { useLanguage } from "../pages/LanguageContext";

export default function StatsPage({ songs = [] }) {
  // Беремо поточну мову з контексту, щоб локалізувати текст
  const { language } = useLanguage();

  // Тексти для локалізації — українська та польська
  const texts = {
    ua: {
      title: "Статистика",
      noData: "Немає даних.",
      topSongTitle: "Найпопулярніша пісня",
      artistLabel: "Артист:",
      playCountLabel: "Кількість прослуховувань:",
      topFiveTitle: "Топ 5 пісень",
      playsWord: "прослуховувань",
    },
    pl: {
      title: "Statystyki",
      noData: "Brak danych.",
      topSongTitle: "Najpopularniejsza piosenka",
      artistLabel: "Artysta:",
      playCountLabel: "Ilość odsłuchań:",
      topFiveTitle: "Top 5 piosenek",
      playsWord: "odsłuchań",
    },
  };

  // Вибираємо текст відповідно до мови, дефолт — українська
  const t = texts[language] || texts.ua;

  // Фільтруємо пісні, залишаємо лише ті, у яких є хоча б 1 прослуховування
  const filteredSongs = songs.filter((song) => song.playCount > 0);

  // Якщо немає пісень з прослуховуваннями — показуємо повідомлення "Немає даних"
  if (filteredSongs.length === 0) {
    return (
      <div className="stats-container">
        <h2>{t.title}</h2>
        <p>{t.noData}</p>
      </div>
    );
  }

  // Копіюємо масив і сортуємо його за спаданням кількості прослуховувань
  const sortedSongs = [...filteredSongs].sort(
    (a, b) => b.playCount - a.playCount
  );

  // Визначаємо найпопулярнішу пісню (перша у відсортованому масиві)
  const topSong = sortedSongs[0];
  // Беремо топ 5 пісень
  const topFive = sortedSongs.slice(0, 5);

  return (
    <div className="stats-container">
      {/* Заголовок сторінки */}
      <h2>{t.title}</h2>

      {/* Секція найпопулярнішої пісні */}
      <section className="top-song">
        <h3>{t.topSongTitle}</h3>
        <div className="song-item">
          {/* Обкладинка пісні або плейсхолдер, якщо немає картинки */}
          <img
            src={topSong.image || "covers/placeholder.jpg"}
            alt={topSong.title}
            className="song-img"
          />
          {/* Інформація про пісню */}
          <div className="song-info">
            <h4>{topSong.title}</h4>
            <p>
              <b>{t.artistLabel}</b> {topSong.artist}
            </p>
            <p>
              <b>{t.playCountLabel}</b> {topSong.playCount}
            </p>
          </div>
        </div>
      </section>

      {/* Секція зі списком топ 5 пісень */}
      <section className="top-list">
        <h3>{t.topFiveTitle}</h3>
        <ol>
          {/* Відображаємо пісні у вигляді пронумерованого списку */}
          {topFive.map((song, idx) => (
            <li key={idx}>
              {/* Назва — виконавець (кількість прослуховувань з локалізованим словом) */}
              {song.title} — {song.artist} ({song.playCount} {t.playsWord})
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
