import { useMemo } from "react";

import { searchGuides } from "../services/guideSearchService";

export function useGuideSearch(query: string) {
  return useMemo(() => searchGuides(query), [query]);
}
