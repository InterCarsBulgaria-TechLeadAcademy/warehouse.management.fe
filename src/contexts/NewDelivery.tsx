import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
import { createContext, ReactNode, useEffect, useState } from 'react'
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
  handleSubmit: () => {},
  pallets: 0,
  setPallets: () => {},
  packets: 0,
  setPackets: () => {},
  pieces: 0,
  setPieces: () => {},
  alertQuantities: '',
  setAlertQuantities: () => {}
})

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const [pallets, setPallets] = useState(0)
  const [packets, setPackets] = useState(0)
  const [pieces, setPieces] = useState(0)
  const [alertQuantities, setAlertQuantities] = useState('')
  const steps = useNewDeliverySteps()

  console.log(`Pallets: ${pallets}`)
  console.log(`Pallets: ${packets}`)
  console.log(`Pallets: ${pieces}`)

  useEffect(() => {
    if (pallets > 0 || packets > 0 || pieces > 0) {
      setAlertQuantities(
        `Остава да поставите още ${pallets} палети, ${packets} пакети, ${pieces} бройки`
      )
    }
  }, [pallets, packets, pieces])

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
    if (currentStep === steps.length) {
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
    handleSubmit,
    pallets,
    setPallets,
    packets,
    setPackets,
    pieces,
    setPieces,
    alertQuantities,
    setAlertQuantities
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
