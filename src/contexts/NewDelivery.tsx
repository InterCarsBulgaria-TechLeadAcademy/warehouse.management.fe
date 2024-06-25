import { createContext, ReactNode, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
import useSetStep3Items from '@/hooks/useSetStep3Items'
import useGenerateLeftItemsAlert from '@/hooks/useGenerateLeftItemsAlert'

interface NewDeliveryProviderProps {
  children: ReactNode
}

export const NewDeliveryContext = createContext<NewDeliveryContextValues>({
  currentStep: 1,
  formsData: {},
  openDialog: false,
  onCloseDialog: () => {},
  handleBack: () => {},
  handleClickOpen: () => {},
  handleSubmit: () => {},
  updateStep4Item: () => {},
  deleteStep4Item: () => {},
  alertMessage: '',
  isCompletedMove: false,
  isExceedQuantity: false,
  step3Items: { pallets: 0, packages: 0, pieces: 0 },
  setStep3Items: () => {}
})

export interface MoveGood {
  type: string // palettes | packages | pieces
  quantity: number
  zone: string
}

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const steps = useNewDeliverySteps()
  const [step3Items, setStep3Items] = useState({ pallets: 0, packages: 0, pieces: 0 })
  const [step4Items, setStep4Items] = useState<MoveGood[]>([{ type: '', quantity: 0, zone: '' }])
  const [alertMessage, setAlertMessage] = useState('')
  const [isCompletedMove, setIsCompletedMove] = useState(false)
  const [isExceedQuantity, setIsExceedQuantity] = useState(false)

  useSetStep3Items(formsData, step3Items, setStep3Items)
  useGenerateLeftItemsAlert(
    step3Items,
    step4Items,
    setIsExceedQuantity,
    setAlertMessage,
    setIsCompletedMove
  )

  function updateStep4Item(index: number, newItem: MoveGood) {
    const newStep4Items = [...step4Items]
    newStep4Items[index] = newItem
    setStep4Items(newStep4Items)
  }

  function deleteStep4Item(index: number) {
    const newStep4Items = step4Items.filter((_, id) => id !== index)
    setStep4Items(newStep4Items)
  }

  function handleClickOpen() {
    setOpenDialog(true)
  }

  function onCloseDialog() {
    setOpenDialog(false)
    setCurrentStep(1)

    setStep3Items({ pallets: 0, packages: 0, pieces: 0 })
    setStep4Items([{ type: '', quantity: 0, zone: '' }])
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      setStep3Items({ pallets: 0, packages: 0, pieces: 0 })
      setStep4Items([{ type: '', quantity: 0, zone: '' }])
    }
  }

  const handleSubmit: SubmitHandler<any> = (data) => {
    if (currentStep === steps.length) {
      console.log('Final submission:', data)
      setFormsData(data)
    } else {
      console.log(data)
      setFormsData(data)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const newDeliveryContextValues: NewDeliveryContextValues = {
    currentStep,
    formsData,
    openDialog,
    onCloseDialog,
    handleBack,
    handleClickOpen,
    handleSubmit,
    updateStep4Item,
    deleteStep4Item,
    alertMessage,
    isCompletedMove,
    isExceedQuantity,
    step3Items,
    setStep3Items
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
