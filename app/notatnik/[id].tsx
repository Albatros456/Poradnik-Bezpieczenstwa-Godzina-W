import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import {
  deleteNote,
  getNoteById,
  updateNote,
} from "../../services/notesService";

export default function NoteDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    void getNoteById(id).then((note) => {
      if (!note) {
        Alert.alert("Nie znaleziono notatki");
        router.back();
        return;
      }

      setTitle(note.title);
      setContent(note.content);
    });
  }, [id]);

  const handleSave = async () => {
    if (!id) {
      return;
    }

    const noteTitle = title.trim();
    const noteContent = content.trim();

    if (!noteTitle && !noteContent) {
      Alert.alert("Uzupełnij notatkę", "Wpisz tytuł lub treść notatki.");
      return;
    }

    await updateNote(id, noteTitle || "Bez tytułu", noteContent);
    router.back();
  };

  const handleDelete = () => {
    if (!id) {
      return;
    }

    Alert.alert("Usuń notatkę", "Czy na pewno chcesz usunąć tę notatkę?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: async () => {
          await deleteNote(id);
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edytuj notatkę</Text>

        <TextInput
          onChangeText={setTitle}
          placeholder="Tytuł"
          placeholderTextColor="#6B7A90"
          style={styles.input}
          value={title}
        />

        <TextInput
          multiline
          onChangeText={setContent}
          placeholder="Treść notatki"
          placeholderTextColor="#6B7A90"
          style={[styles.input, styles.contentInput]}
          textAlignVertical="top"
          value={content}
        />

        <Pressable
          accessibilityRole="button"
          onPress={handleSave}
          style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
        >
          <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleDelete}
          style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
        >
          <Text style={styles.deleteButtonText}>Usuń notatkę</Text>
        </Pressable>
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
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E1E7F0",
    borderRadius: 16,
    borderWidth: 1,
    color: "#0B1F3A",
    fontSize: 17,
    marginBottom: 16,
    padding: 16,
  },
  contentInput: {
    minHeight: 220,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "#2563FF",
    borderRadius: 16,
    minHeight: 58,
    justifyContent: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#FF2D3D",
    borderRadius: 16,
    minHeight: 58,
    justifyContent: "center",
    marginTop: 14,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.75,
  },
});
