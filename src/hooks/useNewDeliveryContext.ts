import * as React from 'react'
import { NewDeliveryContext } from '@/contexts/NewDelivery'

export const useNewDeliveryContext = () => {
  return React.useContext(NewDeliveryContext)
}
