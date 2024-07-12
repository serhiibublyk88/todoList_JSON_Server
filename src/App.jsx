import { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <div className={styles.app}>
      <h1>Todo List</h1>
      <ul className={styles.todoList}>
        {todos.map(({ id, title, completed }) => (
          <li key={id} className={styles.todoItem}>
            <span className={styles.todoTitle}>{title}</span>
            <span
              className={completed ? styles.completed : styles.notCompleted}
            >
              {completed ? "Completed" : "Not Completed"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
