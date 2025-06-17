import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import Button from './Button.js';
import Counter from './Counter.tsx';
import ProductList from "./ProductList.js";

function App() {
  const [count, setCount] = useState(0);

  const onLog = useCallback(() => {
    console.log("Licznik:", count);
  }, [count]);

  return (
    <div>
      <h1>Ćwiczenie 1: Prosta referencja do funkcji</h1>
      <Button />

      <h1>Ćwiczenie 2: Problem z nową referencją</h1>

      <Counter onLog={() => console.log("Licznik")} />

      <h1>Ćwiczenie 3: Rozwiązanie z useCallback</h1>

      <button onClick={() => setCount(c => c + 1)}>Zwiększ: {count}</button>

      <Counter onLog={onLog} />

         <h1>Ćwiczenie 4: useCallback z tablicą jako zależnością</h1>
         
      <ProductList />
    </div>
  );
}

export default App;
