import React, { useState } from 'react';

const tasks = [
  { id: 1, title: 'Nakarmić niewidzialnego kota', completed: true },
  { id: 2, title: 'Policzyć wszystkie gwiazdy na niebie ', completed: false },
  { id: 3, title: 'Zapytać lodówkę, co dziś na obiad', completed: true },
  { id: 4, title: 'Przesunąć ścianę o centymetr w lewo (bo tak)', completed: false },
  { id: 5, title: 'Zgasić światło w pokoju, w którym nikogo nie ma (profilaktycznie)', completed: true },
];

function TaskList() {
  const [filter, setFilter] = useState('all'); 

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed; 
  });

  return (
    <div>
      <h2>Lista zadań</h2>
      {/* Wybór filtra */}
      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">Wszystkie</option>
        <option value="completed">Ukończone</option>
        <option value="incomplete">Nieukończone</option>
      </select>

      {/* Wyświetlanie listy zadań */}
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
