import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import type { GestureResponderEvent } from "react-native";

export default function Button(props: {
	title: string;
	onPress: (event: GestureResponderEvent) => void;
}) {
	const { onPress, title = "Save" } = props;
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
});
