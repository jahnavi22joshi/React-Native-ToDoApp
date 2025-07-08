import React from 'react';
import { TodoProvider } from './context/TodoProvider';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );
}
