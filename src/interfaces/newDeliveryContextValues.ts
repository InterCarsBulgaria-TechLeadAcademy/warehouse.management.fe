import { SubmitHandler } from 'react-hook-form'

export interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  updateStep4Item: (
    index: number,
    newItem: { type: string; quantity: number; zone: string }
  ) => void
  deleteStep4Item: (index: number) => void
  alertMessage: string
  isCompletedMove: boolean
  isExceedQuantity: boolean
  step3Items: { pallets: number; packages: number; pieces: number }
  setStep3Items: React.Dispatch<
    React.SetStateAction<{ pallets: number; packages: number; pieces: number }>
  >
}
