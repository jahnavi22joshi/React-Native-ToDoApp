import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { TodoContext } from '../context/TodoProvider';
import TodoItem from '../components/TodoItem';

const HomeScreen = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <View style={styles.container}>
          <Text style={styles.heading}>📝 To-Do List</Text>

      <TextInput
        placeholder="Add new task..."
        placeholderTextColor="#ccc"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (task.trim()) {
            addTodo(task.trim());
            setTask('');
          }
        }}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('all')} style={styles.allButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')} style={styles.completedButton}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('pending')} style={styles.pendingButton}>
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 60, backgroundColor: '#121212' },
  heading: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 20,
  textAlign: 'center',
},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    color: '#fff', 
    backgroundColor: '#1e1e1e',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4da6ff', // light blue
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  allButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  completedButton: {
    backgroundColor: '#4CAF50', // green
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pendingButton: {
    backgroundColor: '#F44336', // red
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;
