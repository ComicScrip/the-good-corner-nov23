import { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import type { Task } from "@/types";

export default function AddTask({ onAdd }: { onAdd: (t: Task) => void }) {
	const [newTodoName, setNewTodoName] = useState("");

	const addTask = () => {
		if (newTodoName === "") return;
		const id = Math.random().toString();
		const newTask = { id, name: newTodoName, done: false };
		onAdd(newTask);
		setNewTodoName("");
	};

	return (
		<View style={styles.addTaskContainer}>
			<TextInput
				placeholder="Ma nouvelle tâche..."
				value={newTodoName}
				onChangeText={(text) => setNewTodoName(text)}
				style={styles.newTodoNameInput}
				onSubmitEditing={addTask}
			/>
			<Button title="+" onPress={addTask} />
		</View>
	);
}

const styles = StyleSheet.create({
	newTodoNameInput: {
		padding: 10,
		borderColor: "grey",
		borderWidth: 1,
		margin: 10,
		borderRadius: 5,
		width: "80%",
	},
	addTaskContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});
