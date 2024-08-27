import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useState } from "react";
import {
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Button from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";

export type Task = { id: string; done: boolean; name: string };

export default function HomeScreen() {
	const [todoList, setTodoList] = useState<Task[]>([
		{ id: "1", done: true, name: "Faire les courses" },
		{ id: "2", done: false, name: "Rédiger mon dossier projet :'(" },
	]);

	const [newTodoName, setNewTodoName] = useState("");

	const addTask = () => {
		if (newTodoName === "") return;
		const id = nanoid();
		const newTask = { id, name: newTodoName, done: false };
		setTodoList((oldList) => [newTask, ...oldList]);
		setNewTodoName("");
	};

	const createTaskToggler = (t: Task) => () =>
		setTodoList((oldList) =>
			oldList.map((item) =>
				item.id === t.id ? { ...item, done: !t.done } : item,
			),
		);

	const createTaskDeleter = (t: Task) => () =>
		setTodoList((tasks) => tasks.filter((item) => item.id !== t.id));

	return (
		<SafeAreaView>
			<ScrollView>
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

				{todoList.map((t) => (
					<View key={t.id} style={styles.listItem}>
						<View style={styles.listItemTextContainer}>
							<Checkbox value={t.done} onValueChange={createTaskToggler(t)} />
							<TouchableOpacity onPress={createTaskToggler(t)}>
								<Text style={styles.todoText}>{t.name}</Text>
							</TouchableOpacity>
						</View>

						<TouchableOpacity onPress={createTaskDeleter(t)}>
							<AntDesign
								name="delete"
								size={16}
								color="grey"
								style={styles.deleteButton}
							/>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	deleteButton: {
		marginRight: 15,
	},
	listItemTextContainer: {
		flexDirection: "row",
	},
	listItem: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	todoText: {
		marginLeft: 10,
		marginRight: 10,
	},
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
