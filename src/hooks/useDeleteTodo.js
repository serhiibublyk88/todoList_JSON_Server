const useDeleteTodo = (setTodos, setLoadingMessage, setIsProcessing) => {
  return (id) => {
    setLoadingMessage("Deleting...");
    setIsProcessing(true);

    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setTimeout(() => {
        setIsProcessing(false);
        setLoadingMessage("");
      }, 2000);
    });
  };
};

export default useDeleteTodo;
