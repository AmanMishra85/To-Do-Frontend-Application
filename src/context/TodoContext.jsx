import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

function TodoContextProvier({ children }) {
  const [todoList, setTodoList] = useState([]);
  const [totalComplete, setTotalComplete] = useState(0);

  const addTodo = (todo) => {
    todoList.push(todo);
    console.log(todoList);
    localStorage.setItem('todos',JSON.stringify(todoList))
  };

  const removeTodo = (id) => {
    const updatedTodos = todoList.filter((item) => {
      if (item.id == id && item.complete == true) {
        setTotalComplete(totalComplete - 1);
        localStorage.setItem('totalComplete',JSON.stringify(totalComplete-1))
      }
      return item.id != id;
    })
  
    setTodoList(updatedTodos)
    localStorage.setItem('todos',JSON.stringify(updatedTodos))
  };

  const updateTodo = (id, task) => {
    todoList.map((todo) => {
      if (todo.id === id) {
        todo.task = task;
      }
    });
    setTodoList(todoList);
    localStorage.setItem('todos',JSON.stringify(todoList))
  };


  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('todos',todoList))){
      setTodoList(JSON.parse(localStorage.getItem('todos')))
      setTotalComplete(JSON.parse(localStorage.getItem('totalComplete')))
    }
    else{
      localStorage.setItem('todos',JSON.stringify(todoList))
      localStorage.setItem('totalComplete',JSON.stringify(totalComplete))
    }
  },[])

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodo,
        removeTodo,
        totalComplete,
        setTotalComplete,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvier;
