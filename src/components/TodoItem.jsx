
import PropTypes from "prop-types";
import styles from "../App.module.css";

const TodoItem = ({
  id,
  title,
  completed,
  updateTodo,
  deleteTodo,
  isProcessing,
}) => {
  return (
    <li className={styles.todoItem}>
      <span className={styles.todoTitle}>{title}</span>
      <span className={completed ? styles.completed : styles.notCompleted}>
        {completed ? "Completed" : "Not Completed"}
      </span>
      <button
        onClick={() => updateTodo(id, { title, completed: !completed })}
        disabled={isProcessing}
      >
        Update
      </button>
      <button onClick={() => deleteTodo(id)} disabled={isProcessing}>
        Delete
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default TodoItem;

