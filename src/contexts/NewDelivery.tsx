import { createContext, ReactNode, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'
import useSetStep3Items from '@/hooks/useSetStep3Items'

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

interface MoveGood {
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

  useEffect(() => {
    const currentItems = { pallets: 0, packages: 0, pieces: 0 }

    step4Items.map((item) => {
      if (item.type === 'pallets') {
        currentItems.pallets += item.quantity
      } else if (item.type === 'packages') {
        currentItems.packages += item.quantity
      } else if (item.type === 'pieces') {
        currentItems.pieces += item.quantity
      }
      return item
    })

    const leftItems = {
      pallets: step3Items.pallets - currentItems.pallets,
      packages: step3Items.packages - currentItems.packages,
      pieces: step3Items.pieces - currentItems.pieces
    }

    if (leftItems.pallets < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на палетите е надвишено с ${currentItems.pallets - step3Items.pallets}`
      )
    } else if (leftItems.packages < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на пакетите е надвишено с ${currentItems.packages - step3Items.packages}`
      )
    } else if (leftItems.pieces < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на бройките е надвишено с ${currentItems.pieces - step3Items.pieces}`
      )
    } else if (leftItems.pallets === 0 && leftItems.packages === 0 && leftItems.pieces === 0) {
      setIsCompletedMove(true)
      setAlertMessage('Всички стоки са разпределени по зони')
    } else {
      setIsCompletedMove(false)
      setIsExceedQuantity(false)

      let palletsMessage = leftItems.pallets === 0 ? '' : `${leftItems.pallets} палети`
      let packagesMessage =
        leftItems.packages === 0
          ? ''
          : palletsMessage === ''
            ? `${leftItems.packages} пакети`
            : `, ${leftItems.packages} пакети`
      let piecesMessage =
        leftItems.pieces === 0
          ? ''
          : palletsMessage === '' && packagesMessage === ''
            ? `${leftItems.pieces} бройки`
            : `, ${leftItems.pieces} бройки`

      setAlertMessage(
        `Остава да поставите ${palletsMessage} ${packagesMessage} ${piecesMessage} в зони`
      )
    }
  }, [step4Items])

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
