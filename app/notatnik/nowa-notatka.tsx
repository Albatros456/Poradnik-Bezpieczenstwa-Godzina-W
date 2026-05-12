import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import { addNote } from "../../services/notesService";

export default function NewNoteScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    const noteTitle = title.trim();
    const noteContent = content.trim();

    if (!noteTitle && !noteContent) {
      Alert.alert("Uzupełnij notatkę", "Wpisz tytuł lub treść notatki.");
      return;
    }

    await addNote(noteTitle || "Bez tytułu", noteContent);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nowa notatka</Text>

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
          <Text style={styles.saveButtonText}>Zapisz notatkę</Text>
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
  pressed: {
    opacity: 0.75,
  },
});
