import * as React from 'react'
import { NewDeliveryContext } from '@/contexts/NewDelivery'
import { NewDeliveryContextValues } from '@/interfaces/NewDeliveryContextValues'

export const useNewDeliveryContext = (): NewDeliveryContextValues => {
  const context = React.useContext(NewDeliveryContext)

  return context
}
