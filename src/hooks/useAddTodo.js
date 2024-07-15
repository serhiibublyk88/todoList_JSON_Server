const useAddTodo = (
  setTodos,
  allServerTodos,
  currentIndex,
  setCurrentIndex,
  setLoadingMessage,
  setIsProcessing
) => {
  return () => {
    if (currentIndex >= allServerTodos.length) return;
    const newTodo = allServerTodos[currentIndex];
    setLoadingMessage("Loading...");
    setIsProcessing(true);

    fetch("http://localhost:3000/todo", {
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
};

export default useAddTodo;