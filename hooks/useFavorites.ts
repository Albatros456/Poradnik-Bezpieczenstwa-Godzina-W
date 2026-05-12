import { useEffect, useState } from "react";

import { loadFavoriteGuideIds } from "../services/favoritesService";

export function useFavorites() {
  const [favoriteGuideIds, setFavoriteGuideIds] = useState<string[]>([]);

  useEffect(() => {
    void loadFavoriteGuideIds().then(setFavoriteGuideIds);
  }, []);

  return { favoriteGuideIds };
}
