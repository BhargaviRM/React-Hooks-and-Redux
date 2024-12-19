import { useReducer } from "react";

const initialTodos = {
  data: [
    { id: 1, title: "Test1" },
    { id: 2, title: "Test2" },
  ],
  length: 2,
  editingId: null,
  title: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_TODO":
      const newTodos = state.data.filter((item) => item.id !== action.payload);
      return { ...state, data: newTodos };

    case "EDIT_TODO":
      const todoToEdit = state.data.find((item) => item.id === action.payload);
      return { ...state, editingId: action.payload, title: todoToEdit.title };

    case "SAVE_TODO":
      if (state.editingId === null) {
        const newTodo = {
          id: state.length + 1,
          title: state.title,
        };
        return {
          ...state,
          data: [...state.data, newTodo],
          length: state.length + 1,
          title: "",
        };
      } else {
        const updatedTodos = state.data.map((item) =>
          item.id === state.editingId ? { ...item, title: state.title } : item
        );
        return {
          ...state,
          data: updatedTodos,
          editingId: null,
          title: "",
        };
      }

    case "UPDATE_TITLE":
      return { ...state, title: action.payload };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialTodos);

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const handleEdit = (id) => {
    dispatch({
      type: "EDIT_TODO",
      payload: id,
    });
  };

  const handleSave = () => {
    dispatch({
      type: "SAVE_TODO",
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_TITLE",
      payload: e.target.value,
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={state.title} onChange={handleChange} />
      <button onClick={handleSave}>
        {state.editingId === null ? "Add Todo" : "Update Todo"}
      </button>
      {state.data.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          <br />
          <button onClick={() => handleEdit(item.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default App;
