import { Statistics } from "@/lib/Wrapped";

export default abstract class Persona {
  public abstract readonly name: string;
  public abstract readonly description: string;

  /**
   * Get a score between 0 and 1 that indicates how well the given statistics
   * fit this persona.
   */
  public abstract getFittingScore(statistics: Statistics): number;
}
