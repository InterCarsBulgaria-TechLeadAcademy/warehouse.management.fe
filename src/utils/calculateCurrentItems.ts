import { MoveGood } from '@/interfaces/MoveGood'
import { Step3Items } from '@/interfaces/Step3Items'

export default function calculateCurrentItems(step4Items: MoveGood[]): Step3Items {
  const currentItems: Step3Items = { pallets: 0, packages: 0, pieces: 0 }
  step4Items.map((item: MoveGood) => {
    switch (item.type) {
      case 'pallets':
        currentItems.pallets += item.quantity
        break
      case 'packages':
        currentItems.packages += item.quantity
        break
      case 'pieces':
        currentItems.pieces += item.quantity
        break
    }
  })

  return currentItems
}
