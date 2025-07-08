import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const TodoItem = ({ item, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleSave = () => {
    if (newText.trim() === '') {
      Alert.alert('Empty Task', 'Task cannot be empty!');
      return;
    }
    if (newText !== item.text) {
      onUpdate(item.id, newText);
    }
    setEditing(false);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Task?',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    );
  };

  return (
    <View style={styles.item}>
      {editing ? (
        <TextInput
          value={newText}
          onChangeText={setNewText}
          style={styles.input}
          placeholder="Edit task..."
          placeholderTextColor="#aaa"
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={() => onToggle(item.id)} style={{ flex: 1 }}>
          <Text style={item.completed ? styles.completed : styles.text}>{item.text}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.actions}>
        {editing ? (
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.btn}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditing(true)}>
            <Text style={styles.btn}>✏️</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={confirmDelete}>
          <Text style={styles.btn}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#2b2b2b',
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  completed: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#555',
    paddingVertical: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  btn: {
    fontSize: 18,
    marginHorizontal: 6,
    color: '#ccc',
  },
});

export default TodoItem;
