import { useState } from "react";

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [allServerTodos, setAllServerTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return {
    todos,
    setTodos,
    allServerTodos,
    setAllServerTodos,
    currentIndex,
    setCurrentIndex,
  };
};

export default useTodos;
