const useUpdateTodo = (setTodos, setLoadingMessage, setIsProcessing) => {
  return (id, updatedTodo) => {
    setLoadingMessage("Updating...");
    setIsProcessing(true);

    fetch(`http://localhost:3000/todo/${id}`, {
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
};

export default useUpdateTodo;
