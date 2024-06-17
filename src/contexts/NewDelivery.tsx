import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
import { createContext, ReactNode, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

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
  handleSubmit: () => {}
})

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const steps = useNewDeliverySteps()

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
    setCurrentStep(1)
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit: SubmitHandler<any> = (data) => {
    if (currentStep === steps.length - 1) {
      // Final data
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
    handleSubmit
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
