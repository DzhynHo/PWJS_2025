import React, { useRef, useState } from "react";
// Хук для отримання поточної мови з контексту
import { useLanguage } from "../pages/LanguageContext";
// Компонент слайдера
import Slider from "react-slick";
// Імпорт стилів слайдера з пакету slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Локальні стилі для каруселі
import "./style/CarouselPage.css";

function CarouselPage({ songs = [], toggleLike, incrementPlayCount }) {
  // Стан для відстеження поточного слайда
  const [currentSlide, setCurrentSlide] = useState(0);
  // Посилання на слайдер (для керування через код)
  const sliderRef = useRef(null);
  // Поточна мова з контексту
  const { language } = useLanguage();

  // Налаштування для слайдера react-slick
  const settings = {
    dots: true,            // показувати крапки навігації
    infinite: true,        // зациклення слайдів
    speed: 500,            // швидкість анімації в мілісекундах
    slidesToShow: 1,       // скільки слайдів показувати одночасно
    slidesToScroll: 1,     // скільки слайдів прокручувати за один раз
    arrows: true,          // показувати стрілки навігації
    afterChange: (index) => setCurrentSlide(index), // оновлення поточного слайда після прокрутки
  };

  /**
   * Функція для формування абсолютного шляху до файлу.
   * Якщо шлях не починається з "/", додаємо його спереду.
   * Це потрібно для коректного завантаження файлів.
   */
  const getAbsolutePath = (path) =>
    path && !path.startsWith("/") ? "/" + path : path;

  /**
   * Обробник натискання на кнопки "лайк" / "дизлайк".
   * Викликає передану функцію toggleLike з id пісні і станом лайка.
   * Потім автоматично перемикає слайдер на наступний слайд.
   * @param {number|string} songId - id поточної пісні
   * @param {boolean} isLiked - чи поставлено лайк (true) чи дизлайк (false)
   */
  const handleLike = (songId, isLiked) => {
    toggleLike(songId, isLiked);
    if (sliderRef.current) {
      sliderRef.current.slickNext();  // переходимо до наступного слайда
    }
  };

  /**
   * Обробник події відтворення аудіо.
   * Викликає функцію для збільшення лічильника прослуховувань пісні.
   * @param {number|string} songId - id пісні, яка почала відтворюватись
   */
  const handlePlay = (songId) => {
    incrementPlayCount && incrementPlayCount(songId);
  };

  // Тексти для локалізації (українська та польська)
  const texts = {
    ua: {
      artist: "Артист",
      genre: "Жанр",
      audioNotSupported: "Ваш браузер не підтримує відтворення аудіо.",
    },
    pl: {
      artist: "Artysta",
      genre: "Gatunek",
      audioNotSupported: "Twoja przeglądarka nie obsługuje elementu audio.",
    },
  };

  // Вибираємо текстову локалізацію за поточною мовою, або українську за замовчуванням
  const t = texts[language] || texts.ua;

  // Якщо пісень немає — показати повідомлення
  if (!songs.length) {
    return <div>Loading songs...</div>;
  }

  return (
    <div
      className="carousel-container"
      // Встановлюємо фон каруселі — обкладинка поточного слайда
      style={{
        backgroundImage: songs[currentSlide]?.image
          ? `url(${getAbsolutePath(songs[currentSlide].image)})`
          : "none",
      }}
    >
      {/* Темний напівпрозорий фон для кращої видимості тексту */}
      <div className="carousel-overlay"></div>

      <div className="slider-wrapper">
        <Slider ref={sliderRef} {...settings}>
          {songs.map((song) => (
            <div key={song.id} className="song-slide">
              {/* Зображення обкладинки */}
              <img
                src={
                  getAbsolutePath(song.image) || "https://via.placeholder.com/150"
                }
                alt={song.title || "Song image"}
              />
              {/* Назва пісні */}
              <h3>{song.title}</h3>
              {/* Інформація про артиста */}
              <p>
                <b>{t.artist}:</b> {song.artist}
              </p>
              {/* Інформація про жанр */}
              <p>
                <b>{t.genre}:</b> {song.genre}
              </p>
              {/* Відтворювач аудіо */}
              <audio
                controls
                style={{ width: "100%", marginTop: "10px" }}
                onPlay={() => handlePlay(song.id)}
              >
                <source src={getAbsolutePath(song.file)} type="audio/mpeg" />
                {t.audioNotSupported}
              </audio>
              {/* Кнопки лайк / дизлайк */}
              <div className="tinder-buttons">
                <button
                  className="tinder-button like"
                  onClick={() => handleLike(song.id, true)}
                >
                  ❤️
                </button>
                <button
                  className="tinder-button dislike"
                  onClick={() => handleLike(song.id, false)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CarouselPage;
