
import './App.css';
import Hello from './Hello';
import HelloWithProps from './HelloWithProps';
import Counter from './Counter';
import InputTracker from './InputTracker';
import LoginStatus from './LoginStatus';
import TodoList from './TodoList';
import LoginForm from './LoginForm';

function App() {
  const tasks = ['Zrobić zakupy', 'Wypić piwa', 'Zarobić kase na piwo'];

  return (
    <div>
      <h2>Ćwiczenie 1</h2>
      <Hello />

      <h2>Ćwiczenie 2</h2>
      <HelloWithProps name="Taras" />
      <HelloWithProps name="Dima" />
      <HelloWithProps name="Yulia" />

      <h2>Ćwiczenie 3</h2>
      <Counter />

      <h2>Ćwiczenie 4</h2>
      <InputTracker />

      <h2>Ćwiczenie 5</h2>
      <LoginStatus isLoggedIn={true} />
      <LoginStatus isLoggedIn={false} />

      <h2>Ćwiczenie 6</h2>
      <TodoList todos={tasks} />

      <h2>Ćwiczenie 7</h2>
      <LoginForm />
    </div>
  );
}

export default App;
