import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  type GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { guides } from "../../data/guides";
import { useFavoriteGuides } from "../../hooks/useFavoriteGuides";
import type { Guide } from "../../types/guide";

function FavoriteButton({ onPress }: { onPress: () => void }) {
  function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    onPress();
  }

  return (
    <Pressable
      accessibilityLabel="Usuń poradnik z ulubionych"
      accessibilityRole="button"
      accessibilityState={{ selected: true }}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.favoriteButton,
        styles.favoriteButtonActive,
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name="star" size={22} color="#F5A623" />
    </Pressable>
  );
}

function FavoriteGuideCard({
  guide,
  onToggleFavorite,
}: {
  guide: Guide;
  onToggleFavorite: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(ROUTES.guideDetails(guide.id))}
      style={({ pressed }) => [styles.guideCard, pressed && styles.pressed]}
    >
      <View style={styles.guideHeader}>
        <View style={styles.guideHeaderText}>
          <Text style={styles.guideTitle}>{guide.title}</Text>
          <Text style={styles.guideCategory}>{guide.category}</Text>
        </View>
        <FavoriteButton onPress={onToggleFavorite} />
      </View>

      <Text style={styles.guideDescription}>{guide.description}</Text>

      <View style={styles.tags}>
        {guide.keywords.map((keyword) => (
          <Text key={keyword} style={styles.tag}>
            {keyword}
          </Text>
        ))}
      </View>
    </Pressable>
  );
}

export default function FavoriteGuidesScreen() {
  const {
    favoriteGuideIds,
    isLoadingFavorites,
    toggleFavoriteGuide,
  } = useFavoriteGuides();

  const favoriteGuides = useMemo(
    () =>
      favoriteGuideIds
        .map((guideId) => guides.find((guide) => guide.id === guideId))
        .filter((guide): guide is Guide => Boolean(guide)),
    [favoriteGuideIds],
  );

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ulubione poradniki</Text>
        <Text style={styles.description}>
          Poradniki oznaczone gwiazdką są zawsze pod ręką.
        </Text>

        <View style={styles.list}>
          {isLoadingFavorites ? (
            <Text style={styles.emptyText}>Ładowanie ulubionych...</Text>
          ) : favoriteGuides.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="star-outline" size={34} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>Brak ulubionych poradników</Text>
              <Text style={styles.emptyText}>
                Kliknij gwiazdkę przy poradniku, aby dodać go do tej listy.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push(ROUTES.guides)}
                style={({ pressed }) => [
                  styles.browseButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.browseButtonText}>Przejrzyj poradniki</Text>
              </Pressable>
            </View>
          ) : (
            favoriteGuides.map((guide) => (
              <FavoriteGuideCard
                guide={guide}
                key={guide.id}
                onToggleFavorite={() => toggleFavoriteGuide(guide.id)}
              />
            ))
          )}
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
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -0.6,
    lineHeight: 38,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  list: {
    gap: 14,
  },
  guideCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    elevation: 2,
    padding: 20,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  guideHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  guideHeaderText: {
    flex: 1,
  },
  guideTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 25,
    marginBottom: 6,
  },
  guideCategory: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  guideDescription: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  favoriteButton: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  favoriteButtonActive: {
    backgroundColor: "#FFF7E6",
    borderColor: "#F5A623",
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
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
  emptyBox: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 25,
    marginTop: 12,
    textAlign: "center",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    textAlign: "center",
  },
  browseButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  browseButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.82,
  },
});
