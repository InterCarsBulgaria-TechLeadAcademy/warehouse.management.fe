import { Step3Items } from '@/interfaces/Step3Items'
import { useEffect } from 'react'

export interface Good {
  goodTypeStep3: 'pallets' | 'packages' | 'pieces'
  goodQuantityStep3: number
}

interface FormsData {
  goods: Good[]
}

export default function useSetStep3Items(
  formsData: FormsData,
  step3Items: Step3Items,
  setStep3Items: any
) {
  useEffect(() => {
    if (formsData.goods) {
      const newStep3Items = { ...step3Items }
      formsData.goods.map((good: Good) => {
        switch (good.goodTypeStep3) {
          case 'pallets':
            newStep3Items.pallets = good.goodQuantityStep3
            break
          case 'packages':
            newStep3Items.packages = good.goodQuantityStep3
            break
          case 'pieces':
            newStep3Items.pieces = good.goodQuantityStep3
            break
        }
      })
      setStep3Items(newStep3Items)
    }
  }, [formsData.goods])
}
