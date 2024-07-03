import { SubmitHandler } from 'react-hook-form'

export interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  updateGoodsInZones: (
    index: number,
    newItem: { goodTypeStep4: string; goodQuantityStep4: number; zone: string }
  ) => void
  deleteGoodsInZones: (index: number) => void
  alertMessage: string[]
  isCompletedMove: boolean
  isExceedQuantity: boolean
  goodTypeStep3: { pallets: number; packages: number; pieces: number }
  setGoodTypeStep3: React.Dispatch<
    React.SetStateAction<{ pallets: number; packages: number; pieces: number }>
  >
}
