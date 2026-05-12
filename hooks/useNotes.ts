import { useCallback, useEffect, useState } from "react";

import { loadNotes } from "../services/notesService";
import type { Note } from "../types/note";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const refreshNotes = useCallback(async () => {
    const loadedNotes = await loadNotes();
    setNotes(loadedNotes);
  }, []);

  useEffect(() => {
    void refreshNotes();
  }, [refreshNotes]);

  return { notes, refreshNotes };
}
