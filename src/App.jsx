import { useState } from "react";
import {
  useFetchTodos,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
  useTodos,
} from "./hooks";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import styles from "./App.module.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    todos,
    allServerTodos,
    setAllServerTodos,
    setTodos,
    currentIndex,
    setCurrentIndex,
  } = useTodos();
  useFetchTodos(setAllServerTodos);
  const addTodo = useAddTodo(
    setTodos,
    allServerTodos,
    currentIndex,
    setCurrentIndex,
    setLoadingMessage,
    setIsProcessing
  );
  const updateTodo = useUpdateTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );
  const deleteTodo = useDeleteTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSorted) {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className={styles.app}>
      {isProcessing && (
        <div className={styles.overlay}>
          <h2 className={styles.loadingText}>{loadingMessage}</h2>
        </div>
      )}
      <h1>Todo List</h1>
      <TodoForm
        addTodo={addTodo}
        handleSearch={handleSearch}
        toggleSort={toggleSort}
        isSorted={isSorted}
        isProcessing={isProcessing}
      />
      <ul className={styles.todoList}>
        {filteredTodos.map(({ id, title, completed }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            isProcessing={isProcessing}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
