import { GoodQuantityStep3 } from '@/interfaces/NewDelivery.ts'

export default function calculateLeftItems(
  goodTypeStep3: GoodQuantityStep3,
  currentItems: GoodQuantityStep3
): GoodQuantityStep3 {
  const leftItems: GoodQuantityStep3 = {
    pallets: goodTypeStep3.pallets - currentItems.pallets,
    packages: goodTypeStep3.packages - currentItems.packages,
    pieces: goodTypeStep3.pieces - currentItems.pieces
  }
  return leftItems
}
