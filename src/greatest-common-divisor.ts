export function greatestCommonDivisor(a: number, b: number): number {
  if (a === 0) {
    return b;
  }
  return greatestCommonDivisor(b % a, a);
}
