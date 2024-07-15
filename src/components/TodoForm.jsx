
import PropTypes from "prop-types";
import styles from "../App.module.css";

const TodoForm = ({
  addTodo,
  handleSearch,
  toggleSort,
  isSorted,
  isProcessing,
}) => (
  <div className={styles.controls}>
    <button onClick={addTodo} disabled={isProcessing}>
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
);

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  toggleSort: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
  isProcessing: PropTypes.bool.isRequired,
};

export default TodoForm;
