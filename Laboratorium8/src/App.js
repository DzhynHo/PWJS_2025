import './App.css';
import React, { useState } from 'react';
import ToggleDetails from './ToggleDetails';
import ScoreDisplay from './ScoreDisplay';
import TaskList from './TaskList'; 
import UserList from './UserList';
import TimerCounter from './TimerCounter';


function App() {
  const [userScore, setUserScore] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { 
      setUserScore(value);
    }
  };

  return (
    <div className="App">
      <h1>Ćwiczenie 1 – Warunkowe renderowanie</h1>
      <ToggleDetails />

      <h1>Ćwiczenie 2 – Wynik użytkownika</h1>
      <input
        type="text"
        value={userScore}
        onChange={handleChange}
        placeholder="Wpisz swój wynik"
      />
      {userScore !== '' && <ScoreDisplay score={parseInt(userScore, 10)} />}

      <h1>Ćwiczenie 3 – Lista zadań</h1>
      <TaskList />

      <h1>Ćwiczenia 4 - Lista użytkowników</h1>
      <UserList />

      <h1>Ćwiczenia 5 - Licznik</h1>
      <TimerCounter />
    </div>
  );
}

export default App;
