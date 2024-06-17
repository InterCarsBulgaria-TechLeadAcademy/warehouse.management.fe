import { SubmitHandler } from 'react-hook-form'

export interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  pallets: number
  setPallets: React.Dispatch<React.SetStateAction<number>>
  packets: number
  setPackets: React.Dispatch<React.SetStateAction<number>>
  pieces: number
  setPieces: React.Dispatch<React.SetStateAction<number>>
  alertQuantities: string
  setAlertQuantities: React.Dispatch<React.SetStateAction<string>>
}
