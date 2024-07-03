import { useEffect } from 'react'
import { GoodQuantityStep3 } from '@/interfaces/NewDelivery.ts'

export interface Good {
  goodTypeStep3: 'pallets' | 'packages' | 'pieces'
  goodQuantityStep3: number
}

interface FormsData {
  goods: Good[]
}

export default function useSetGoodsType(
  formsData: FormsData,
  goodTypeStep3: GoodQuantityStep3,
  setGoodTypeStep3: React.Dispatch<
    React.SetStateAction<{ pallets: number; packages: number; pieces: number }>
  >
) {
  useEffect(() => {
    if (formsData.goods) {
      const newGoodTypeStep3 = { ...goodTypeStep3 }
      formsData.goods.map((good: Good) => {
        switch (good.goodTypeStep3) {
          case 'pallets':
            newGoodTypeStep3.pallets = good.goodQuantityStep3
            break
          case 'packages':
            newGoodTypeStep3.packages = good.goodQuantityStep3
            break
          case 'pieces':
            newGoodTypeStep3.pieces = good.goodQuantityStep3
            break
        }
      })
      setGoodTypeStep3(newGoodTypeStep3)
    }
  }, [formsData.goods])
}
