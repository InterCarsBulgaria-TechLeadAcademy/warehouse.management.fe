import { useTranslation } from 'react-i18next'
import useSchema from '@/hooks/useSchema'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import {
  NewDeliveryStep1FormData,
  NewDeliveryStep2FormData,
  NewDeliveryStep3FormData,
  NewDeliveryStep4FormData
} from '@/schemas/newDeliverySchemas'
import FormDialog from '@/components/shared/FormDialog'
import NewDeliveryRenderForm from './NewDeliveryRenderForm'

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
      //This key is not good
      // renderForm={(methods) => <NewDeliveryRenderForm {...methods} key={openDialog} />}
      renderForm={(methods) => <NewDeliveryRenderForm {...methods} />}
    />
  )
}
