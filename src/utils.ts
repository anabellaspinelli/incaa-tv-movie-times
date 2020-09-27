export function getIntegersInRange(min: number, max: number): number[] {
  const numbers = []
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  return numbers
}
