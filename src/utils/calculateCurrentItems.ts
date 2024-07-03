import { GoodQuantityStep3, MoveGood } from '@/interfaces/NewDelivery.ts'

export default function calculateCurrentItems(goodsInZones: MoveGood[]): GoodQuantityStep3 {
  const currentItems: GoodQuantityStep3 = { pallets: 0, packages: 0, pieces: 0 }
  goodsInZones.map((item: MoveGood) => {
    switch (item.goodTypeStep4) {
      case 'pallets':
        currentItems.pallets += item.goodQuantityStep4
        break
      case 'packages':
        currentItems.packages += item.goodQuantityStep4
        break
      case 'pieces':
        currentItems.pieces += item.goodQuantityStep4
        break
    }
  })

  return currentItems
}
