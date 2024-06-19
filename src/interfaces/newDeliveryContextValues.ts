import { SubmitHandler } from 'react-hook-form'

export interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  step4Items: { type: string; quantity: number; zone: string }[]
  setStep4Items: React.Dispatch<
    React.SetStateAction<{ type: string; quantity: number; zone: string }[]>
  >
  updateStep4Item: (
    index: number,
    newItem: { type: string; quantity: number; zone: string }
  ) => void
  deleteStep4Item: (index: number) => void
  alertMessage: string
  isCompletedMove: boolean
  isExceedQuantity: boolean
}
