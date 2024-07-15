import { useEffect } from "react";

const useFetchTodos = (setAllServerTodos) => {
  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => {
        setAllServerTodos(data);
      });
  }, [setAllServerTodos]);
};

export default useFetchTodos;
