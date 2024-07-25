interface GoodItem {
  goodQuantityStep3: string
  goodTypeStep3: string
}

export default function goodQuantity(
  array: GoodItem[],
  goodType: keyof GoodItem,
  currentGood: string,
  goodQuantity: keyof GoodItem
): number {
  const good = array.find((good: GoodItem) => good[goodType] === currentGood)
  return good ? Number(good[goodQuantity]) : 0
}
