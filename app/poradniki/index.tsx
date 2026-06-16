import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  type GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { guideCategories } from "../../data/guideCategories";
import { guides } from "../../data/guides";
import { useFavoriteGuides } from "../../hooks/useFavoriteGuides";
import type { Guide } from "../../types/guide";

type SearchMode = "keywords" | "categories";

function FavoriteButton({
  isFavorite,
  onPress,
}: {
  isFavorite: boolean;
  onPress: () => void;
}) {
  function handlePress(event: GestureResponderEvent) {
    event.stopPropagation();
    onPress();
  }

  return (
    <Pressable
      accessibilityLabel={
        isFavorite ? "Usuń poradnik z ulubionych" : "Dodaj poradnik do ulubionych"
      }
      accessibilityRole="button"
      accessibilityState={{ selected: isFavorite }}
      onPress={handlePress}
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
    </Pressable>
  );
}

function GuideCard({
  guide,
  isFavorite,
  onToggleFavorite,
}: {
  guide: Guide;
  isFavorite: boolean;
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
        <FavoriteButton
          isFavorite={isFavorite}
          onPress={onToggleFavorite}
        />
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

export default function GuidesScreen() {
  const [searchMode, setSearchMode] = useState<SearchMode>("keywords");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const { isFavoriteGuide, toggleFavoriteGuide } = useFavoriteGuides();

  const filteredGuides = useMemo(() => {
    if (searchMode === "categories") {
      if (selectedCategory === "Wszystkie") {
        return guides;
      }

      return guides.filter((guide) => guide.category === selectedCategory);
    }

    const query = searchText.trim().toLowerCase();

    if (!query) {
      return guides;
    }

    return guides.filter((guide) => {
      const searchableText = [
        guide.title,
        guide.description,
        guide.category,
        guide.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchMode, searchText, selectedCategory]);

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Poradniki/instrukcje</Text>
        <Text style={styles.description}>
          Znajdź instrukcję według słów kluczowych albo wybierz kategorię.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(ROUTES.favoriteGuides)}
          style={({ pressed }) => [
            styles.favoriteScreenButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="star" size={22} color="#F5A623" />
          <Text style={styles.favoriteScreenButtonText}>
            Ulubione poradniki
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>

        <View style={styles.modeButtons}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setSearchMode("keywords")}
            style={[
              styles.modeButton,
              searchMode === "keywords" && styles.modeButtonActive,
            ]}
          >
            <Text
              style={[
                styles.modeButtonText,
                searchMode === "keywords" && styles.modeButtonTextActive,
              ]}
            >
              Słowa kluczowe
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => setSearchMode("categories")}
            style={[
              styles.modeButton,
              searchMode === "categories" && styles.modeButtonActive,
            ]}
          >
            <Text
              style={[
                styles.modeButtonText,
                searchMode === "categories" && styles.modeButtonTextActive,
              ]}
            >
              Kategorie
            </Text>
          </Pressable>
        </View>

        {searchMode === "keywords" ? (
          <TextInput
            onChangeText={setSearchText}
            placeholder="Wpisz słowo kluczowe, np. rana, woda, ewakuacja..."
            placeholderTextColor="#6B7A90"
            style={styles.input}
            value={searchText}
          />
        ) : (
          <View style={styles.categories}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedCategory("Wszystkie")}
              style={[
                styles.categoryButton,
                selectedCategory === "Wszystkie" && styles.categoryButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === "Wszystkie" &&
                    styles.categoryButtonTextActive,
                ]}
              >
                Wszystkie
              </Text>
            </Pressable>

            {guideCategories.map((category) => (
              <Pressable
                accessibilityRole="button"
                key={category.id}
                onPress={() => setSelectedCategory(category.name)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name &&
                    styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.name &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.list}>
          {filteredGuides.length === 0 ? (
            <Text style={styles.emptyText}>Nie znaleziono poradników.</Text>
          ) : (
            filteredGuides.map((guide) => (
              <GuideCard
                guide={guide}
                isFavorite={isFavoriteGuide(guide.id)}
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
  favoriteScreenButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    flexDirection: "row",
    marginBottom: 16,
    minHeight: 56,
    paddingHorizontal: 16,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  favoriteScreenButtonText: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 12,
  },
  modeButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 10,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  modeButtonTextActive: {
    color: colors.white,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    marginBottom: 18,
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  categoryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  categoryButtonActive: {
    backgroundColor: colors.surfaceAccent,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  categoryButtonTextActive: {
    color: colors.primary,
  },
  list: {
    gap: 14,
  },
  guideCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
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
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 24,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.82,
  },
});
