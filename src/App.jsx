import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import styles from "./App.module.css";

const API_URL = "http://localhost:3000/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [allServerTodos, setAllServerTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(""); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllServerTodos(data);
      });
  }, []);

  const requestAddToDO = () => {
    if (currentIndex >= allServerTodos.length) return; 

    const newTodo = allServerTodos[currentIndex]; 
    setLoadingMessage("Loading..."); 
    setIsProcessing(true); 

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]); 
        setCurrentIndex((prevIndex) => prevIndex + 1); 
        setTimeout(() => {
          setIsProcessing(false);
          setLoadingMessage(""); 
        }, 2000);
      });
  };

  const requestUpdateToDO = (id, updatedTodo) => {
    setLoadingMessage("Updating..."); 
    setIsProcessing(true); 

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? data : todo))
        );
        setTimeout(() => {
          setIsProcessing(false);
          setLoadingMessage(""); 
        }, 2000);
      });
  };

  const requestDeleteToDO = (id) => {
    setLoadingMessage("Deleting..."); 
    setIsProcessing(true); 

    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setTimeout(() => {
        setIsProcessing(false);
        setLoadingMessage(""); 
      }, 2000);
    });
  };

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 500);

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  const getFilteredTodos = () => {
    let filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isSorted) {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  };

  return (
    <div className={styles.app}>
      {isProcessing && (
        <div className={styles.overlay}>
          <h2 className={styles.loadingText}>{loadingMessage}</h2>
        </div>
      )}
      <h1>Todo List</h1>
      <div className={styles.controls}>
        <button onClick={requestAddToDO} disabled={isProcessing}>
          Add todo
        </button>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={toggleSort} disabled={isProcessing}>
          {isSorted ? "Unsort" : "Sort A-Z"}
        </button>
      </div>
      <ul className={styles.todoList}>
        {getFilteredTodos().map(({ id, title, completed }) => (
          <li key={id} className={styles.todoItem}>
            <span className={styles.todoTitle}>{title}</span>
            <span
              className={completed ? styles.completed : styles.notCompleted}
            >
              {completed ? "Completed" : "Not Completed"}
            </span>
            <button
              onClick={() =>
                requestUpdateToDO(id, { title, completed: !completed })
              }
              disabled={isProcessing}
            >
              Update
            </button>
            <button
              onClick={() => requestDeleteToDO(id)}
              disabled={isProcessing}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
