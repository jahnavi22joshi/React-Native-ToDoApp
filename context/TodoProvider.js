import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const loadTodos = async () => {
    const storedTodos = await AsyncStorage.getItem('todos');
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  };

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
