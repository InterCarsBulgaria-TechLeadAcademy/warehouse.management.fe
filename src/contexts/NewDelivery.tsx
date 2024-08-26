import { createContext, ReactNode, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import useGenerateLeftItemsAlert from '@/hooks/useGenerateLeftItemsAlert'
import useSetGoodsType from '@/hooks/useSetGoodsType.ts'
import { MoveGood } from '@/interfaces/NewDelivery.ts'
import usePostDelivery from '@/hooks/services/deliveries/usePostDelivery'
import goodQuantity from '@/utils/goodQuantity'
import usePostEntry from '@/hooks/services/entries/usePostEntry'
import createEntryData from '@/utils/createEntryData'
import { dateToUtc } from '@/utils/dateHelpers.ts'

interface NewDeliveryProviderProps {
  children: ReactNode
}

interface NewDeliveryContextValues {
  currentStep: number
  formsData: { [key: string]: any }
  openDialog: boolean
  onCloseDialog: () => void
  handleBack: () => void
  handleClickOpen: () => void
  handleSubmit: SubmitHandler<any>
  updateGoodsInZones: (
    index: number,
    newItem: { goodTypeStep4: string; goodQuantityStep4: number; zone: string }
  ) => void
  deleteGoodsInZones: (index: number) => void
  alertMessage: string[]
  isCompletedMove: boolean
  isExceedQuantity: boolean
  goodTypeStep3: { pallets: number; packages: number; pieces: number }
  setGoodTypeStep3: React.Dispatch<
    React.SetStateAction<{ pallets: number; packages: number; pieces: number }>
  >
}

export const NewDeliveryContext = createContext<NewDeliveryContextValues>({
  currentStep: 1,
  formsData: {},
  openDialog: false,
  onCloseDialog: () => {},
  handleBack: () => {},
  handleClickOpen: () => {},
  handleSubmit: () => {},
  updateGoodsInZones: () => {},
  deleteGoodsInZones: () => {},
  alertMessage: [],
  isCompletedMove: false,
  isExceedQuantity: false,
  goodTypeStep3: { pallets: 0, packages: 0, pieces: 0 },
  setGoodTypeStep3: () => {}
})

export default function NewDeliveryProvider({ children }: NewDeliveryProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formsData, setFormsData] = useState<any>({})
  const [openDialog, setOpenDialog] = useState(false)
  const steps = useNewDeliverySteps()
  const [goodTypeStep3, setGoodTypeStep3] = useState({ pallets: 0, packages: 0, pieces: 0 })
  const [goodsInZones, setGoodsInZones] = useState<MoveGood[]>([
    { goodTypeStep4: '', goodQuantityStep4: 0, zone: '' }
  ])
  const [alertMessage, setAlertMessage] = useState<string[]>([])
  const [isCompletedMove, setIsCompletedMove] = useState(false)
  const [isExceedQuantity, setIsExceedQuantity] = useState(false)
  const mutationDeliveryPost = usePostDelivery()
  const mutationEntryPost = usePostEntry()

  useSetGoodsType(formsData, goodTypeStep3, setGoodTypeStep3)
  useGenerateLeftItemsAlert(
    goodTypeStep3,
    goodsInZones,
    setAlertMessage,
    setIsExceedQuantity,
    setIsCompletedMove
  )

  function updateGoodsInZones(index: number, newItem: MoveGood) {
    const newGoodsInZones = [...goodsInZones]
    newGoodsInZones[index] = newItem
    setGoodsInZones(newGoodsInZones)
  }

  function deleteGoodsInZones(index: number) {
    const newGoodsInZones = goodsInZones.filter((_, id) => id !== index)
    setGoodsInZones(newGoodsInZones)
  }

  function handleClickOpen() {
    setOpenDialog(true)
  }

  function onCloseDialog() {
    setCurrentStep(1)
    setFormsData({})
    setOpenDialog(false)
    setGoodTypeStep3({ pallets: 0, packages: 0, pieces: 0 })
    setGoodsInZones([{ goodTypeStep4: '', goodQuantityStep4: 0, zone: '' }])
    setAlertMessage([])
    setIsCompletedMove(false)
    setIsExceedQuantity(false)
  }

  function handleBack() {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit: SubmitHandler<any> = (data) => {
    if (currentStep === steps.length) {
      console.log('Final submission:', data)

      mutationDeliveryPost.mutate(
        {
          systemNumber: data.systemNumber.join(' | '),
          receptionNumber: data.receptionNumber.join(' | '),
          truckNumber: data.truckNumber,
          cmr: data.cmr,
          deliveryTime: dateToUtc(data.deliveryTime),
          pallets: goodQuantity(data.goods, 'goodTypeStep3', 'pallets', 'goodQuantityStep3'),
          packages: goodQuantity(data.goods, 'goodTypeStep3', 'packages', 'goodQuantityStep3'),
          pieces: goodQuantity(data.goods, 'goodTypeStep3', 'pieces', 'goodQuantityStep3'),
          vendorId: Number(data.vendorId),
          markers: data.markers
        },
        {
          onSuccess: (response) => {
            const deliveryId = Number(response)
            mutationEntryPost.mutate(createEntryData(data.goodsInZones, deliveryId))
          }
        }
      )
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
    updateGoodsInZones,
    deleteGoodsInZones,
    alertMessage,
    isCompletedMove,
    isExceedQuantity,
    goodTypeStep3,
    setGoodTypeStep3
  }

  return (
    <NewDeliveryContext.Provider value={newDeliveryContextValues}>
      {children}
    </NewDeliveryContext.Provider>
  )
}
