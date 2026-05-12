import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Note } from "../types/note";

export const NOTES_STORAGE_KEY = "poradnik_bezpieczenstwa_notes";

export async function loadNotes(): Promise<Note[]> {
  const savedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

  if (!savedNotes) {
    return [];
  }

  return JSON.parse(savedNotes) as Note[];
}

async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

export async function getNoteById(id: string): Promise<Note | undefined> {
  const notes = await loadNotes();

  return notes.find((note) => note.id === id);
}

export async function addNote(title: string, content: string) {
  const notes = await loadNotes();
  const now = new Date().toISOString();
  const newNote: Note = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };

  await saveNotes([newNote, ...notes]);
}

export async function updateNote(id: string, title: string, content: string) {
  const notes = await loadNotes();
  const updatedNotes = notes.map((note) =>
    note.id === id
      ? {
          ...note,
          title,
          content,
          updatedAt: new Date().toISOString(),
        }
      : note,
  );

  await saveNotes(updatedNotes);
}

export async function deleteNote(id: string) {
  const notes = await loadNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);

  await saveNotes(updatedNotes);
}
