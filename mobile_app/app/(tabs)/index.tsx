import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddTask from "@/components/AddTask";
import TaskListItem from "@/components/TaskListItem";
import type { Task } from "@/types";

export default function HomeScreen() {
	const [todoList, setTodoList] = useState<Task[]>([
		{ id: "1", done: true, name: "Faire les courses" },
		{ id: "2", done: false, name: "Rédiger mon dossier projet :'(" },
	]);

	const handleAdd = (newTask: Task) => setTodoList([...todoList, newTask]);

	const handleDelete = (t: Task) =>
		setTodoList(todoList.filter((item) => item.id !== t.id));

	const handleToggle = (t: Task) =>
		setTodoList((oldList) =>
			oldList.map((item) =>
				item.id === t.id ? { ...item, done: !t.done } : item,
			),
		);

	return (
		<SafeAreaView>
			<ScrollView>
				<AddTask onAdd={handleAdd} />
				{todoList.map((t) => (
					<TaskListItem
						key={t.id}
						task={t}
						onDelete={handleDelete}
						onToggle={handleToggle}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
