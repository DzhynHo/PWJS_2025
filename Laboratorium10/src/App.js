import React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import "./App.css";

import ClickCounter from "./ClickCounter";
import UseMemo from "./UseMemo";
import FormReducer from "./FormReducer";
import { ThemeProvider, useTheme } from "./ThemeContext";
import LayoutEffectExample from "./LayoutEffectExample";



// Ćwiczenie 4 - ThemeSwitcher
function ThemeSwitcher() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: dark ? "#333" : "#fff",
        color: dark ? "#fff" : "#000",
        padding: "1rem",
        minHeight: "100vh",
      }}
    >
      <button onClick={toggleTheme}>Przełącz motyw</button>
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <h1>Ćwiczenia 1</h1>
        <ClickCounter />

        <h1>Ćwiczenia 2</h1>
        <UseMemo />

        <h1>Ćwiczenia 3</h1>
        <FormReducer />

        <h1>Ćwiczenia 4</h1>
        <ThemeSwitcher />

        <h1>Ćwiczenia 5</h1>
        <LayoutEffectExample />
      </div>
    </ThemeProvider>
  );
}

export default App;
