import { useFocusEffect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
    <SafeAreaView style={styles.safeArea}>
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
    marginBottom: 24,
    textAlign: "center",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#2563FF",
    borderRadius: 16,
    minHeight: 58,
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#0B1F3A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  emptyText: {
    color: "#0B1F3A",
    fontSize: 17,
    lineHeight: 24,
    marginTop: 24,
    textAlign: "center",
  },
  list: {
    gap: 16,
  },
  noteCard: {
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
  noteTitle: {
    color: "#0B1F3A",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  noteContent: {
    color: "#35465F",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  noteDate: {
    color: "#6B7A90",
    fontSize: 13,
  },
  pressed: {
    opacity: 0.75,
  },
});
