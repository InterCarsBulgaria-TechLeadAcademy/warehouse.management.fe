import { SubmitHandler } from 'react-hook-form'

export interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  goodsTypeQuantityStep4: { pallets: number; packages: number; pieces: number }[]
  setGoodTypeQuantityStep4: React.Dispatch<
    React.SetStateAction<{ pallets: number; packages: number; pieces: number }[]>
  >
  alertQuantities: string
  setAlertQuantities: React.Dispatch<React.SetStateAction<string>>
}
