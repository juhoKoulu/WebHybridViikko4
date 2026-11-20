import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Todo } from './components/Todo';
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TodoData = {
  title: string;
  isDone: boolean;
};

const STORAGE_KEY = 'TODOS'

export default function App() {
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [todos, setTodos] = useState<TodoData[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTodos !== null) {
          setTodos(JSON.parse(savedTodos) as TodoData[]);
        }
      } catch (error) {
        console.error("Failed to load todos:", error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(todos)
      );
    };

    saveTodos();
  }, [todos]);

  const handleSubmit = () => {
    setTodos([...todos, { title: newTodoName, isDone: false}]);
    setNewTodoName("");
  };

  const setTodoDone = (title: string, isDone: boolean) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.title === title ? { ...todo, isDone } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a todo..."
        value={newTodoName}
        onChangeText={setNewTodoName}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />

      <StatusBar style="auto" />
      {todos.map((todo, index) => (
        <Todo
          key={index}
          title={todo.title}
          isDone={todo.isDone}
          onSetDone={(isDone) => setTodoDone(todo.title, isDone)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    alignSelf: "center",
  },
  input: {
    margin: 12,
  },
});
