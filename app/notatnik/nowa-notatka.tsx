import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../constants/colors";
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
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
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
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    marginBottom: 14,
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  contentInput: {
    minHeight: 240,
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    marginTop: 8,
    minHeight: 54,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
  },
});
