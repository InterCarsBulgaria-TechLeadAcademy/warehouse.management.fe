import * as React from 'react'
import { NewDeliveryContext } from '@/contexts/NewDelivery'
import { NewDeliveryContextValues } from '@/interfaces/newDeliveryContextValues'

export const useNewDeliveryContext = (): NewDeliveryContextValues => {
  const context = React.useContext(NewDeliveryContext)

  return context
}
