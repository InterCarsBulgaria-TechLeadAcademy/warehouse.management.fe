import { createContext, ReactNode, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'
import useGenerateLeftItemsAlert from '@/hooks/useGenerateLeftItemsAlert'
import useSetGoodsType from '@/hooks/useSetGoodsType.ts'
import { MoveGood } from '@/interfaces/NewDelivery.ts'
import usePostDelivery from '@/hooks/services/deliveries/usePostDelivery'

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
  const postMutation = usePostDelivery()

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
      //Final submission
      //   {
      //     "deliveryNumber": "1",
      //     "receptionNumber": "1", DA
      //     "cmr": "1", DA
      //     "markers": [ DA
      //         "55"
      //     ],
      //     "vendorName": "Bosch",
      //     "vendorId": "1", DA
      //     "truckNumber": "1", DA
      //     "deliveryTime": "2024-07-15T08:28:03.419Z",
      //     "goods": [
      //         {
      //             "goodTypeStep3": "pallets",
      //             "goodQuantityStep3": "1"
      //         }
      //     ],
      //     "goodsInZones": [
      //         {
      //             "goodTypeStep4": "pallets",
      //             "goodQuantityStep4": "1",
      //             "zone": "Zone12"
      //         }
      //     ]
      // }

      //must be
      // {
      //   "systemNumber": "string", deliveryNumber при мен
      //   "receptionNumber": "string", DA
      //   "truckNumber": "string", DA
      //   "cmr": "string", DA
      //   "deliveryTime": "2024-07-15T08:31:24.301Z", DA
      //   "pallets": 0,
      //   "packages": 0,
      //   "pieces": 0,
      //   "isApproved": true,
      //   "vendorId": 0, DA
      //   "markers": [ DA
      //     0
      //   ]
      // }

      // mutationPost.mutate({ name: data.zoneName, markerIds: markerIds, isFinal: data.isFinal })
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
