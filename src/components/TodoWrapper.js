import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = ({ handleTaskTrack })=> {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false, timeSpent: false},
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));



  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Move up and down function
  const moveUp = (id) => {
    setTodos(prevTodos => {
      const index = prevTodos.findIndex(todo => todo.id === id);
      if (index === 0) return prevTodos; // Already at the top
  
      const newTodos = [...prevTodos];
      const temp = newTodos[index];
      newTodos[index] = newTodos[index - 1];
      newTodos[index - 1] = temp;
  
      return newTodos;
    });
  };
  
  const moveDown = (id) => {
    setTodos(prevTodos => {
      const index = prevTodos.findIndex(todo => todo.id === id);
      if (index === prevTodos.length - 1) return prevTodos; // Already at the bottom
  
      const newTodos = [...prevTodos];
      const temp = newTodos[index];
      newTodos[index] = newTodos[index + 1];
      newTodos[index + 1] = temp;
  
      return newTodos;
    });
  };
  

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        )
      )}
    </div>
  );
};