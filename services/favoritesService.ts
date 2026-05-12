import { getFavoriteGuideIds } from "../database/favoritesRepository";

export async function loadFavoriteGuideIds(): Promise<string[]> {
  return getFavoriteGuideIds();
}
