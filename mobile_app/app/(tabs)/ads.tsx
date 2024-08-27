import { StyleSheet, Image, ScrollView, Text, View } from "react-native";
import { useRecentAdsQuery } from "@/graphql/generated/schema";

export default function AdsScreen() {
	const { data, loading } = useRecentAdsQuery();

	if (loading) return <Text style={styles.title}>Chargement...</Text>;

	const ads = data?.ads || [];

	console.log({ ads });

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{ads.map((ad) => (
				<View key={ad.id} style={styles.adContainer}>
					<Image src={ad.picture} style={{ width: 300, height: 200 }} />
					<View style={styles.adInfo}>
						<Text style={styles.title}>{ad.title}</Text>
						<Text style={styles.title}>{ad.price} €</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	adContainer: {
		padding: 10,
	},
	adInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
