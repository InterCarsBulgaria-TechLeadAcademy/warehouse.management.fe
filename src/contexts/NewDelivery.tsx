import { createContext, ReactNode, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'

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
  step4Items: [{ type: '', quantity: 0, zone: '' }],
  setStep4Items: () => {},
  updateStep4Item: () => {},
  deleteStep4Item: () => {},
  alertMessage: '',
  isCompletedMove: false,
  isExceedQuantity: false
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
  const [step4Items, setStep4Items] = useState<MoveGood[]>([{ type: '', quantity: 0, zone: '' }])
  const [step3Items, setStep3Items] = useState({ pallets: 0, packages: 0, pieces: 0 })
  const [alertMessage, setAlertMessage] = useState('')
  const [isCompletedMove, setIsCompletedMove] = useState(false)
  const [isExceedQuantity, setIsExceedQuantity] = useState(false)

  useEffect(() => {
    // Махни if проверката, когато context не е в main.ts
    if (formsData.goods) {
      const newStep3Items = { ...step3Items }
      formsData.goods.map((good: any) => {
        switch (good.goodTypeStep3) {
          case 'Палети':
            newStep3Items.pallets = good.goodQuantityStep3
            return setStep3Items(newStep3Items)
          case 'Пакети':
            newStep3Items.packages = good.goodQuantityStep3
            return setStep3Items(newStep3Items)
          case 'Бройки':
            newStep3Items.pieces = good.goodQuantityStep3
            return setStep3Items(newStep3Items)
        }
      })
    }
  }, [formsData])

  useEffect(() => {
    setAlertMessage(
      `Остава да поставите ${step3Items.pallets} палети, ${step3Items.packages} пакети, ${step3Items.pieces} бройки в зони`
    )
  }, [step3Items])

  function updateStep4Item(index: number, newItem: MoveGood) {
    const newStep4Items = [...step4Items]
    newStep4Items[index] = newItem
    setStep4Items(newStep4Items)
  }

  function deleteStep4Item(index: number) {
    const newStep4Items = step4Items.filter((_, id) => id !== index)
    setStep4Items(newStep4Items)
  }

  useEffect(() => {
    const currentItems = { pallets: 0, packages: 0, pieces: 0 }

    step4Items.map((item) => {
      if (item.type === 'Палети') {
        currentItems.pallets += item.quantity
      } else if (item.type === 'Пакети') {
        currentItems.packages += item.quantity
      } else if (item.type === 'Бройки') {
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
        `Количеството на палетите е надвишено с ${currentItems.packages - step3Items.packages}`
      )
    } else if (leftItems.pieces < 0) {
      setIsExceedQuantity(true)
      setAlertMessage(
        `Количеството на палетите е надвишено с ${currentItems.pieces - step3Items.pieces}`
      )
    } else if (leftItems.pallets === 0 && leftItems.packages === 0 && leftItems.pieces === 0) {
      setIsCompletedMove(true)
      setAlertMessage('Всички стоки са разпределени по зони')
    } else {
      setIsCompletedMove(false)
      setIsExceedQuantity(false)
      setAlertMessage(
        `Остава да поставите ${leftItems.pallets} палети, ${leftItems.packages} пакети, ${leftItems.pieces} бройки в зони`
      )
    }
  }, [step4Items])

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
    step4Items,
    setStep4Items,
    updateStep4Item,
    deleteStep4Item,
    alertMessage,
    isCompletedMove,
    isExceedQuantity
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
