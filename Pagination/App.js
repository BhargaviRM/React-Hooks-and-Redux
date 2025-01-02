import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const numberOfPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(numberOfPages + 1).keys()].slice(1);
  const lastIndex = currentPage * todosPerPage;
  const firstIndex = lastIndex - todosPerPage;
  const visibleTodos = todos.slice(firstIndex, lastIndex);
  const handlePrev = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage !== numberOfPages) setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <select onClick={(event) => setTodosPerPage(event.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
      {visibleTodos.map((item) => (
        <p>{item.title} </p>
      ))}
      <button onClick={handlePrev}>Prev</button>
      {pages.map((page) => (
        <span
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page} |{" "}
        </span>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default App;
