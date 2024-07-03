export interface MoveGood {
  goodTypeStep4: string // palettes | packages | pieces
  goodQuantityStep4: number
  zone: string
}

export interface GoodQuantityStep3 {
  pallets: number
  packages: number
  pieces: number
}

export interface Good {
  goodTypeStep3: string
  goodQuantityStep3: string
}
