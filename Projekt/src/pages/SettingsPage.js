import React from "react";
import { useLanguage } from "../pages/LanguageContext"; // Імпорт хука для роботи з мовою з контексту
import "./style/SettingPage.css"; // Імпорт стилів для сторінки налаштувань

export default function SettingsPage() {
  // Отримуємо поточну мову та функцію для зміни мови з контексту
  const { language, changeLanguage } = useLanguage();

  // Об'єкт з текстами для двох мов — української та польської
  const texts = {
    ua: {
      title: "Налаштування",
      selectLang: "Оберіть мову інтерфейсу:",
      ua: "Українська",
      pl: "Польська",
    },
    pl: {
      title: "Ustawienia",
      selectLang: "Wybierz język interfejsu:",
      ua: "Ukraiński",
      pl: "Polski",
    },
  };

  // Вибираємо тексти відповідно до поточної мови, або українські за замовчуванням
  const t = texts[language] || texts.ua;

  return (
    <div className="settings-container">
      {/* Заголовок сторінки */}
      <h2>{t.title}</h2>

      {/* Текст з інструкцією вибору мови */}
      <p>{t.selectLang}</p>

      {/* Блок кнопок для вибору мови */}
      <div className="language-switcher">
        {/* Кнопка для вибору української мови */}
        <button
          onClick={() => changeLanguage("ua")}  // При кліку змінюємо мову на "ua"
          disabled={language === "ua"}           // Кнопка вимкнена, якщо вже вибрана ця мова
          className={language === "ua" ? "active" : ""} // Додаємо клас active для підсвітки
        >
          {t.ua}  {/* Текст кнопки */}
        </button>

        {/* Кнопка для вибору польської мови */}
        <button
          onClick={() => changeLanguage("pl")}  // При кліку змінюємо мову на "pl"
          disabled={language === "pl"}           // Вимикаємо кнопку, якщо вже вибрана польська
          className={language === "pl" ? "active" : ""} // Підсвічуємо активну кнопку
        >
          {t.pl}  {/* Текст кнопки */}
        </button>
      </div>
    </div>
  );
}
