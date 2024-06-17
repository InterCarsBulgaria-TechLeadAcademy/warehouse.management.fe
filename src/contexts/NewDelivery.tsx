import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
import { createContext, ReactNode, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'

interface NewDeliveryProviderProps {
  children: ReactNode
}

export const NewDeliveryContext = createContext<NewDeliveryContextValues>({
  currentStep: 0,
  formsData: {},
  openDialog: false,
  onCloseDialog: () => {},
  handleBack: () => {},
  handleClickOpen: () => {},
  handleSubmit: () => {}
})

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const steps = useNewDeliverySteps()

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
    setCurrentStep(0)
  }

  const handleBack = () => {
    if (currentStep > 0) {
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

// import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
// import { createContext, ReactNode, useState } from 'react'

// interface NewDeliveryProviderProps {
//   children: ReactNode
// }

// export const NewDeliveryContext = createContext<NewDeliveryContextValues>({
//   currentStep: 0,
//   setCurrentStep: () => {},
//   formsData: {},
//   setFormsData: () => {}
// })

// export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formsData, setFormsData] = useState<any>({})

//   const newDeliveryContextValues: NewDeliveryContextValues = {
//     currentStep,
//     setCurrentStep,
//     formsData,
//     setFormsData
//   }

//   return (
//     <NewDeliveryContext.Provider value={newDeliveryContextValues}>
//       {children}
//     </NewDeliveryContext.Provider>
//   )
// }
