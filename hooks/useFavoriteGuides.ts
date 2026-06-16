import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";

import {
  loadFavoriteGuideIds,
  saveFavoriteGuideIds,
} from "../services/favoriteGuidesService";

export function useFavoriteGuides() {
  const [favoriteGuideIds, setFavoriteGuideIds] = useState<string[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  const refreshFavorites = useCallback(() => {
    let isActive = true;

    async function loadFavorites() {
      try {
        const loadedFavoriteGuideIds = await loadFavoriteGuideIds();

        if (isActive) {
          setFavoriteGuideIds(loadedFavoriteGuideIds);
        }
      } finally {
        if (isActive) {
          setIsLoadingFavorites(false);
        }
      }
    }

    loadFavorites();

    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(refreshFavorites);

  const favoriteGuideIdsSet = useMemo(
    () => new Set(favoriteGuideIds),
    [favoriteGuideIds],
  );

  const isFavoriteGuide = useCallback(
    (guideId: string) => favoriteGuideIdsSet.has(guideId),
    [favoriteGuideIdsSet],
  );

  const toggleFavoriteGuide = useCallback((guideId: string) => {
    setFavoriteGuideIds((currentFavoriteGuideIds) => {
      const isAlreadyFavorite = currentFavoriteGuideIds.includes(guideId);
      const updatedFavoriteGuideIds = isAlreadyFavorite
        ? currentFavoriteGuideIds.filter((id) => id !== guideId)
        : [guideId, ...currentFavoriteGuideIds];

      saveFavoriteGuideIds(updatedFavoriteGuideIds).catch(() => undefined);

      return updatedFavoriteGuideIds;
    });
  }, []);

  return {
    favoriteGuideIds,
    isFavoriteGuide,
    isLoadingFavorites,
    toggleFavoriteGuide,
  };
}
