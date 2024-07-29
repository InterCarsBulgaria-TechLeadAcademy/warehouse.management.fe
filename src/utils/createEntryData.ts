interface GoodItem {
  goodTypeStep4: string
  goodQuantityStep4: string
  zone: string
}

interface CreateEntryData {
  pallets: number
  packages: number
  pieces: number
  deliveryId: number
  zoneId: number
}

export default function createEntryData(array: GoodItem[], deliveryId: number): CreateEntryData[] {
  const createEntryData: CreateEntryData[] = []
  array.map((good: GoodItem) => {
    createEntryData.push({
      pallets: good.goodTypeStep4 === 'pallets' ? Number(good.goodQuantityStep4) : 0,
      packages: good.goodTypeStep4 === 'packages' ? Number(good.goodQuantityStep4) : 0,
      pieces: good.goodTypeStep4 === 'pieces' ? Number(good.goodQuantityStep4) : 0,
      deliveryId: deliveryId,
      zoneId: Number(good.zone)
    })
  })
  return createEntryData
}
