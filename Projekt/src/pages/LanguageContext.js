import React, { createContext, useContext, useState } from "react";

// Створюємо контекст для зберігання інформації про мову інтерфейсу
const LanguageContext = createContext();

// Об'єкт з перекладами текстів для двох мов: українська (ua) та польська (pl)
const translations = {
  ua: {
    navbar: {
      home: "КАРУСЕЛА",
      favorites: "УЛЮБЛЕНІ",
      allSongs: "ВСІ ПІСНІ",
      stats: "СТАТИСТИКА",
      settings: "НАЛАШТУВАННЯ",
    },
    carousel: {
      welcome: "Ласкаво просимо до Каруселі",
      // інші тексти для каруселі
    },
    favorites: {
      title: "Улюблені пісні",
      noFavorites: "У вас немає улюблених пісень.",
    },
    allSongs: {
      title: "Всі пісні",
      searchPlaceholder: "Пошук за назвою або виконавцем...",
      allGenres: "Всі жанри",
      noSongs: "Пісень, що відповідають пошуку, не знайдено.",
    },
    stats: {
      title: "Статистика прослуховувань",
      topSong: "Найпопулярніша пісня",
      artist: "Виконавець",
      playCount: "Кількість прослуховувань",
      topFive: "Топ 5 пісень",
      noData: "Немає даних.",
    },
    settings: {
      title: "Налаштування",
      // інші тексти налаштувань
    },
  },
  pl: {
    navbar: {
      home: "KARUZELA",
      favorites: "ULUBIONE",
      allSongs: "WSZYSTKIE PIOSENKI",
      stats: "STATYSTYKI",
      settings: "USTAWIENIA",
    },
    carousel: {
      welcome: "Witamy w Karuzeli",
    },
    favorites: {
      title: "Ulubione piosenki",
      noFavorites: "Nie masz jeszcze ulubionych piosenek.",
    },
    allSongs: {
      title: "Wszystkie piosenki",
      searchPlaceholder: "Szukaj według tytułu lub artysty...",
      allGenres: "Wszystkie gatunki",
      noSongs: "Brak piosenek spełniających kryteria wyszukiwania.",
    },
    stats: {
      title: "Statystyki odsłuchań",
      topSong: "Najpopularniejsza piosenka",
      artist: "Artysta",
      playCount: "Ilość odsłuchań",
      topFive: "Top 5 piosenek",
      noData: "Brak danych.",
    },
    settings: {
      title: "Ustawienia",
    },
  },
};

// Провайдер, який обгортає додаток і надає доступ до мови та функції її зміни
export function LanguageProvider({ children }) {
  // Зберігаємо поточну мову у стані (за замовчуванням українська)
  const [language, setLanguage] = useState("ua");

  // Функція для зміни мови інтерфейсу
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    // Передаємо через контекст: поточну мову, функцію для зміни мови,
    // а також об'єкт з перекладами для цієї мови (t)
    <LanguageContext.Provider
      value={{ language, changeLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Кастомний хук для зручного отримання доступу до контексту мови
export function useLanguage() {
  const context = useContext(LanguageContext);

  // Якщо хук використовується поза провайдером, кидаємо помилку
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context; // Повертаємо контекст: мову, змінник мови та переклади
}
