import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import "./styles.css";

const todos = [
  { id: 1, name: "Test1" },
  { id: 2, name: "Test2" },
];

const reducer = (state, action) => {
  if (action.type === "DELETE_TODO") {
    const newTodo = state.filter((item) => item.id !== action.payload);
    return newTodo;
  }
  if (action.type === "ADD_TODO") {
    return [...state, action.payload];
  }
  if (action.type === "UPDATE_TODO") {
    const updatedTodos = state.map((item) =>
      item.id === action.payload.id
        ? { ...item, name: action.payload.name }
        : item
    );
    return updatedTodos;
  }
  return state;
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, todos);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const handleDelete = (id) => {
    console.log(id);
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };
  const handleEdit = (id) => {
    const newTodo = state.filter((item) => item.id === id);
    setName(newTodo[0].name);
    setEditId(newTodo[0].id);
  };
  const handleAdd = () => {
    const newTodo = {
      id: state.length + 1,
      name: name,
    };
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    setName("");
  };
  const handleUpdate = () => {
    if (editId !== null) {
      const updatedTodo = { id: editId, name };
      dispatch({
        type: "UPDATE_TODO",
        payload: updatedTodo,
      });
      setName("");
      setEditId(null);
    }
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={editId !== null ? handleUpdate : handleAdd}>
        {editId !== null ? "Update Todo" : "Add Todo"}
      </button>
      {state.map((item) => (
        <div>
          <p>{item.name}</p>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
