import { Step3Items } from '@/interfaces/Step3Items'

export default function calculateLeftItems(step3Items: Step3Items, currentItems: Step3Items) {
  const leftItems: Step3Items = {
    pallets: step3Items.pallets - currentItems.pallets,
    packages: step3Items.packages - currentItems.packages,
    pieces: step3Items.pieces - currentItems.pieces
  }
  return leftItems
}
