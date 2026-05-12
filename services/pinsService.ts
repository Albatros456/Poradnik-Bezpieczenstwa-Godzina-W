import { getPins } from "../database/pinsRepository";

export async function loadPins() {
  return getPins();
}
