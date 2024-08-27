import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { Task } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkbox from "expo-checkbox";

export type TaskListItemProps = {
	task: Task;
	onDelete: (t: Task) => void;
	onToggle: (t: Task) => void;
};

export default function TaskListItem({
	task,
	onDelete,
	onToggle,
}: TaskListItemProps) {
	return (
		<View style={styles.listItem}>
			<View style={styles.listItemTextContainer}>
				<Checkbox value={task.done} onValueChange={() => onToggle(task)} />
				<TouchableOpacity onPress={() => onToggle(task)}>
					<Text style={styles.todoText}>{task.name}</Text>
				</TouchableOpacity>
			</View>

			<TouchableOpacity onPress={() => onDelete(task)}>
				<AntDesign
					name="delete"
					size={16}
					color="grey"
					style={styles.deleteButton}
				/>
			</TouchableOpacity>
		</View>
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
});
