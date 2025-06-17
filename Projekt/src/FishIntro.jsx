import { useState, useEffect } from "react";
import fishWalk1 from "./img/fish-walk-1.png";
import fishWalk2 from "./img/fish-walk-2.png";
import fishStanding from "./img/fish-standing.png";
import fishExtra1 from "./img/fish-extra-1.png";
import fishExtra2 from "./img/fish-extra-2.png";
import fishExtra3 from "./img/fish-extra-3.png";

import "./FishIntro.css";

export default function FishIntro({ onFinish }) {
  // Кадри для анімації ходьби рибки
  const walkFrames = [fishWalk1, fishWalk2];
  // Кадри для додаткової анімації рибки (після основних етапів)
  const extraFrames = [fishExtra1, fishExtra2, fishExtra3];

  // Індекс поточного кадру анімації
  const [frameIndex, setFrameIndex] = useState(0);
  // Поточний етап анімації: walking, standing, extra, ready
  const [stage, setStage] = useState("walking");
  // Для ефекту затухання (fade out) на етапі standing
  const [fadeOut, setFadeOut] = useState(false);

  // Ефект, який керує переходом між етапами анімації
  useEffect(() => {
    let interval, timeout;

    if (stage === "walking") {
      // Перемикання кадрів ходьби кожні 300 мс
      interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % walkFrames.length);
      }, 300);

      // Через 3 секунди переходимо до стадії standing і зупиняємо анімацію ходьби
      timeout = setTimeout(() => {
        setStage("standing");
        clearInterval(interval);
      }, 3000);

    } else if (stage === "standing") {
      // Після 1 секунди починаємо fade out
      timeout = setTimeout(() => {
        setFadeOut(true);

        // Через 300 мс після fade out переходимо до стадії extra,
        // скидаємо кадр анімації і знімаємо fade out
        setTimeout(() => {
          setStage("extra");
          setFrameIndex(0);
          setFadeOut(false);
        }, 300);
      }, 1000);

    } else if (stage === "extra") {
      // Перемикання кадрів додаткової анімації кожні 200 мс
      interval = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % extraFrames.length);
      }, 200);

      // Через 2.4 секунди зупиняємо анімацію і переходимо до готової стадії ready
      timeout = setTimeout(() => {
        clearInterval(interval);
        setStage("ready");
      }, 2400);
    }

    // Очищуємо таймери при зміні стадії або демонтовані компонента
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stage]);

  // Ефект, що оновлює позицію підсвітки градієнта в залежності від розташування контейнера
  useEffect(() => {
    const updateGradientPosition = () => {
      const container = document.querySelector(".intro-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const xPercent = (centerX / window.innerWidth) * 100;
        const yPercent = (centerY / window.innerHeight) * 100;
        // Задаємо CSS-перемінні для позиції підсвітки
        document.documentElement.style.setProperty("--mouse-x", `${xPercent}%`);
        document.documentElement.style.setProperty("--mouse-y", `${yPercent}%`);
      }
    };

    // Виконуємо оновлення одразу та кожні 50 мс
    updateGradientPosition();
    const interval = setInterval(updateGradientPosition, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fullscreen-wrapper">
      <div className="intro-container">
        {/* Етап ходьби: відображаємо кадри анімації ходьби */}
        {stage === "walking" && (
          <img
            src={walkFrames[frameIndex]}
            alt="Fish walking"
            className="fish visible walking"
          />
        )}

        {/* Етап стояння: показуємо рибку, яка стоїть, з ефектом fadeOut */}
        {stage === "standing" && (
          <div className="look-scene">
            <img
              src={fishStanding}
              alt="Fish standing"
              className={`fish visible ${fadeOut ? "fade" : ""}`}
            />
          </div>
        )}

        {/* Етап додаткової анімації: циклічно показуємо extra кадри */}
        {stage === "extra" && (
          <div className="look-scene">
            <img
              src={extraFrames[frameIndex]}
              alt="Fish extra"
              className="fish visible"
            />
          </div>
        )}

        {/* Останній етап — показуємо заголовок та кнопку для переходу далі */}
        {stage === "ready" && (
          <div className="intro-final">
            <h1 className="site-title">StemSfeer</h1>
            <button className="enter-button" onClick={onFinish}>
              ZALOGUJ SIĘ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
