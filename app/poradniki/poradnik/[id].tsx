import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../constants/colors";
import { guides } from "../../../data/guides";
import { useFavoriteGuides } from "../../../hooks/useFavoriteGuides";

export default function GuideDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavoriteGuide, toggleFavoriteGuide } = useFavoriteGuides();
  const guide = guides.find((item) => item.id === id);
  const isFavorite = guide ? isFavoriteGuide(guide.id) : false;

  if (!guide) {
    return (
      <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.notFoundText}>Nie znaleziono poradnika.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{guide.title}</Text>
        <Text style={styles.category}>{guide.category}</Text>
        <Pressable
          accessibilityLabel={
            isFavorite
              ? "Usuń poradnik z ulubionych"
              : "Dodaj poradnik do ulubionych"
          }
          accessibilityRole="button"
          accessibilityState={{ selected: isFavorite }}
          onPress={() => toggleFavoriteGuide(guide.id)}
          style={({ pressed }) => [
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={22}
            color={isFavorite ? "#F5A623" : colors.textMuted}
          />
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? "W ulubionych" : "Dodaj do ulubionych"}
          </Text>
        </Pressable>

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
    backgroundColor: colors.background,
  },
  container: {
    alignSelf: "center",
    flexGrow: 1,
    maxWidth: 720,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 12,
    width: "100%",
  },
  centerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 38,
    marginBottom: 8,
    textAlign: "center",
  },
  category: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 14,
    textAlign: "center",
  },
  favoriteButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginBottom: 24,
    minHeight: 48,
    paddingHorizontal: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  favoriteButtonActive: {
    backgroundColor: "#FFF7E6",
    borderColor: "#F5A623",
  },
  favoriteButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 20,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: colors.surfaceAccent,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  notFoundText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.82,
  },
});
