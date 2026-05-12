import { guides } from "../data/guides";
import type { Guide } from "../types/guide";

export function searchGuides(query: string): Guide[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return guides;
  }

  return guides.filter((guide) =>
    guide.title.toLowerCase().includes(normalizedQuery),
  );
}
