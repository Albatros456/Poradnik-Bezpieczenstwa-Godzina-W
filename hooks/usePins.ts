import { useEffect, useState } from "react";

import { loadPins } from "../services/pinsService";
import type { Pin } from "../types/pin";

export function usePins() {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    void loadPins().then(setPins);
  }, []);

  return { pins };
}
