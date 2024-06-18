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
  goodsTypeQuantityStep4: [{ pallets: 0, packages: 0, pieces: 0 }],
  setGoodTypeQuantityStep4: () => {},
  alertQuantities: '',
  setAlertQuantities: () => {}
})

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const [goodsTypeQuantityStep4, setGoodTypeQuantityStep4] = useState([
    { pallets: 0, packages: 0, pieces: 0 }
  ])
  const [alertQuantities, setAlertQuantities] = useState('')
  const steps = useNewDeliverySteps()

  // console.log(formsData)
  //Initial set goodsTypeQuantityStep4 from step3 quantities
  useEffect(() => {
    const newGoodsTypeQuantity = { pallets: 0, packages: 0, pieces: 0 }
    formsData.goods?.forEach((good: any) => {
      switch (good.goodTypeStep3) {
        case 'Палети':
          newGoodsTypeQuantity.pallets += good.goodQuantityStep3
          break
        case 'Пакети':
          newGoodsTypeQuantity.packages += good.goodQuantityStep3
          break
        case 'Бройки':
          newGoodsTypeQuantity.pieces += good.goodQuantityStep3
          break
        default:
          break
      }
    })
    setGoodTypeQuantityStep4([newGoodsTypeQuantity])
  }, [formsData])

  useEffect(() => {
    setAlertQuantities(
      `Поставите ${goodsTypeQuantityStep4[0].pallets} палети, ${goodsTypeQuantityStep4[0].packages} пакети, ${goodsTypeQuantityStep4[0].pieces} бройки в зони`
    )
  }, [goodsTypeQuantityStep4])

  console.log(goodsTypeQuantityStep4)

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
    goodsTypeQuantityStep4,
    setGoodTypeQuantityStep4,
    alertQuantities,
    setAlertQuantities
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
