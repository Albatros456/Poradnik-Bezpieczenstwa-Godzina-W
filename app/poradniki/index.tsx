import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ROUTES } from "../../constants/routes";
import { guideCategories } from "../../data/guideCategories";
import { guides } from "../../data/guides";
import type { Guide } from "../../types/guide";

type SearchMode = "keywords" | "categories";

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(ROUTES.guideDetails(guide.id))}
      style={({ pressed }) => [styles.guideCard, pressed && styles.pressed]}
    >
      <Text style={styles.guideTitle}>{guide.title}</Text>
      <Text style={styles.guideCategory}>{guide.category}</Text>
      <Text style={styles.guideDescription}>{guide.description}</Text>

      <View style={styles.tags}>
        {guide.keywords.map((keyword) => (
          <Text key={keyword} style={styles.tag}>
            {keyword}
          </Text>
        ))}
      </View>

      {/*<Text style={styles.detailsText}>Zobacz szczegóły</Text>*/}
    </Pressable>
  );
}

export default function GuidesScreen() {
  const [searchMode, setSearchMode] = useState<SearchMode>("keywords");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Poradniki/instrukcje</Text>
        <Text style={styles.description}>
          Znajdź instrukcję według słów kluczowych albo wybierz kategorię.
        </Text>

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
              <GuideCard guide={guide} key={guide.id} />
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
    backgroundColor: "#F6F8FB",
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    color: "#0B1F3A",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    color: "#35465F",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22,
    textAlign: "center",
  },
  modeButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  modeButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 10,
  },
  modeButtonActive: {
    backgroundColor: "#2563FF",
    borderColor: "#2563FF",
  },
  modeButtonText: {
    color: "#0B1F3A",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  modeButtonTextActive: {
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 16,
    borderWidth: 1,
    color: "#0B1F3A",
    fontSize: 16,
    marginBottom: 18,
    padding: 16,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#E7F0FF",
    borderColor: "#2563FF",
  },
  categoryButtonText: {
    color: "#0B1F3A",
    fontSize: 14,
    fontWeight: "700",
  },
  categoryButtonTextActive: {
    color: "#2563FF",
  },
  list: {
    gap: 16,
  },
  guideCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  guideTitle: {
    color: "#0B1F3A",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 6,
  },
  guideCategory: {
    color: "#2563FF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
  },
  guideDescription: {
    color: "#35465F",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
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
  detailsText: {
    color: "#2563FF",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyText: {
    color: "#0B1F3A",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
