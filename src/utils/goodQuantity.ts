export default function goodQuantity(
  array: any,
  goodTypeStep: string,
  goodQuantityStep: string,
  currentGood: string
): number {
  const good = array.find((good: any) => good[goodTypeStep] === currentGood)
  return good ? Number(good[goodQuantityStep]) : 0
}
