import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";

type TodoProps = {
  title: string;
  isDone: boolean;
  onSetDone : (isDone: boolean) => void;
};

export const Todo = ( { title, isDone, onSetDone } : TodoProps) => {
  return (
    <Pressable style={styles.todo} onPress={ () => {
        onSetDone(!isDone);
    }}>
      <Text style={styles.title}>{title + (isDone ? " (Done)" : "")}</Text>
    </Pressable >
  )
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: "#555",
  },
});


