import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleComplete, deleteTodo } from "./todoSlice";

const Todo = () => {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleAddTodo = () => {
    if (text && deadline) {
      dispatch(addTodo({ text, deadline }));
      setText("");
      setDeadline("");
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  const groupTodosByDate = () => {
    const groups = {};
    filteredTodos.forEach(todo => {
      const date = new Date(todo.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(todo);
    });
    return groups;
  };

  const getDeadlineColor = (deadline) => {
    if (!deadline) return "black";
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - now;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    if (deadlineDate < now) return "red";
    if (daysDiff <= 1) return "orange";
    return "green";
  };

  const groupedTodos = groupTodosByDate();

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Todo List</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter todo text"
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={handleDeadlineChange}
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button 
          onClick={handleAddTodo}
          style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}
        >
          Add Todo
        </button>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
        <label>Filter: </label>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
      
      {Object.entries(groupedTodos).map(([date, todos]) => (
        <div key={date} style={{ marginBottom: "30px" }}>
          <h3>{date}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <li 
                key={todo.id}
                style={{ 
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    style={{ marginRight: "10px" }}
                  />
                  <span style={{ 
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "inherit"
                  }}>
                    {todo.text}
                  </span>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  {!todo.completed && (
                    <span style={{ color: getDeadlineColor(todo.deadline) }}>
                      Deadline: {new Date(todo.deadline).toLocaleString()}
                    </span>
                  )}
                  {todo.completed && (
                    <span style={{ color: "#888", fontSize: "0.8em" }}>
                      Completed at: {new Date(todo.completedAt).toLocaleString()}
                    </span>
                  )}
                  <button 
                    onClick={() => handleDeleteTodo(todo.id)}
                    style={{ 
                      marginTop: "5px",
                      padding: "4px 8px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "0.8em"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Todo;