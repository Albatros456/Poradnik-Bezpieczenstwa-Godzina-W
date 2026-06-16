import { useFocusEffect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import { loadNotes } from "../../services/notesService";
import type { Note } from "../../types/note";

function formatDate(value: string) {
  return new Date(value).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      void loadNotes().then(setNotes);
    }, []),
  );

  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Notatnik</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(ROUTES.newNote)}
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        >
          <Text style={styles.addButtonText}>Dodaj notatkę</Text>
        </Pressable>

        {notes.length === 0 ? (
          <Text style={styles.emptyText}>Brak notatek. Dodaj pierwszą notatkę.</Text>
        ) : (
          <View style={styles.list}>
            {notes.map((note) => (
              <Pressable
                accessibilityRole="button"
                key={note.id}
                onPress={() => router.push(ROUTES.noteDetails(note.id))}
                style={({ pressed }) => [styles.noteCard, pressed && styles.pressed]}
              >
                <Text style={styles.noteTitle}>{note.title || "Bez tytułu"}</Text>
                <Text numberOfLines={2} style={styles.noteContent}>
                  {note.content || "Brak treści"}
                </Text>
                <Text style={styles.noteDate}>
                  Ostatnia edycja: {formatDate(note.updatedAt)}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
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
    marginBottom: 24,
    textAlign: "center",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    marginBottom: 22,
    minHeight: 54,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 32,
    textAlign: "center",
  },
  list: {
    gap: 14,
  },
  noteCard: {
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
  noteTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 25,
    marginBottom: 8,
  },
  noteContent: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  noteDate: {
    color: colors.textMuted,
    fontSize: 13,
  },
  pressed: {
    opacity: 0.82,
  },
});
