import { useTranslation } from 'react-i18next'
import FormDialog from '../shared/FormDialog'
import useSchema from '@/hooks/useSchema'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import NewDeliveryRenderForm from './forms/NewDeliveryRenderForm'
import {
  NewDeliveryStep1FormData,
  NewDeliveryStep2FormData,
  NewDeliveryStep3FormData,
  NewDeliveryStep4FormData
} from '@/schemas/newDeliverySchemas'

export default function NewDeliveryFormDialog() {
  const { t: translate } = useTranslation()
  const { currentStep, openDialog, onCloseDialog, handleBack, handleSubmit } =
    useNewDeliveryContext()
  const schema = useSchema(currentStep)
  return (
    <FormDialog<
      | NewDeliveryStep1FormData
      | NewDeliveryStep2FormData
      | NewDeliveryStep3FormData
      | NewDeliveryStep4FormData
    >
      open={openDialog}
      title={translate('newDelivery.title')}
      confirmText={translate('newDelivery.labels.forward')}
      discardText={translate('newDelivery.labels.back')}
      onCloseDialog={onCloseDialog}
      handleBack={handleBack}
      schema={schema}
      onSubmit={handleSubmit}
      renderForm={(methods) => <NewDeliveryRenderForm {...methods} key={openDialog} />}
    />
  )
}
