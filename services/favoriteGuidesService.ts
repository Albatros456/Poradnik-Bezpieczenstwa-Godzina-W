import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITE_GUIDES_STORAGE_KEY =
  "poradnik_bezpieczenstwa_favorite_guides";

export async function loadFavoriteGuideIds(): Promise<string[]> {
  const savedFavoriteGuideIds = await AsyncStorage.getItem(
    FAVORITE_GUIDES_STORAGE_KEY,
  );

  if (!savedFavoriteGuideIds) {
    return [];
  }

  return JSON.parse(savedFavoriteGuideIds) as string[];
}

export async function saveFavoriteGuideIds(guideIds: string[]) {
  await AsyncStorage.setItem(
    FAVORITE_GUIDES_STORAGE_KEY,
    JSON.stringify(guideIds),
  );
}
