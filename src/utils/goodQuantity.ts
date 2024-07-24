import { Good } from '@/interfaces/NewDelivery'

export default function goodQuantity(data: any, currentGood: string): number {
  const good = data.goods.find((good: Good) => good.goodTypeStep3 === currentGood)
  return good ? Number(good.goodQuantityStep3) : 0
}
