import { getCompassHeading } from "../services/compassService";

export function useCompass() {
  return {
    heading: getCompassHeading(),
  };
}
