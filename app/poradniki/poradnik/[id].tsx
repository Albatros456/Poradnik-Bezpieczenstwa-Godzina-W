import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { guides } from "../../../data/guides";

export default function GuideDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const guide = guides.find((item) => item.id === id);

  if (!guide) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.notFoundText}>Nie znaleziono poradnika.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{guide.title}</Text>
        <Text style={styles.category}>{guide.category}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.text}>{guide.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Instrukcja</Text>
          <Text style={styles.text}>{guide.content}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Słowa kluczowe</Text>
          <View style={styles.tags}>
            {guide.keywords.map((keyword) => (
              <Text key={keyword} style={styles.tag}>
                {keyword}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  centerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  category: {
    color: "#2563FF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 22,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    color: "#0B1F3A",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  text: {
    color: "#35465F",
    fontSize: 16,
    lineHeight: 24,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#E7F0FF",
    borderRadius: 10,
    color: "#2563FF",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  notFoundText: {
    color: "#0B1F3A",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
