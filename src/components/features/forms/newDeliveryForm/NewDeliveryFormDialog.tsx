import { useTranslation } from 'react-i18next'
import useCreateDeliverySchemasStepper from '@/hooks/useCreateDeliverySchemasStepper.ts'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import {
  NewDeliveryStep1FormData,
  NewDeliveryStep2FormData,
  NewDeliveryStep3FormData,
  NewDeliveryStep4FormData
} from '@/schemas/newDeliverySchemas'
import FormDialog from '@/components/shared/FormDialog'
import NewDeliveryRenderForm from './NewDeliveryRenderForm'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'

export default function NewDeliveryFormDialog() {
  const { t: translate } = useTranslation()
  const { currentStep, openDialog, onCloseDialog, handleBack, handleSubmit, isCompletedMove } =
    useNewDeliveryContext()
  const steps = useNewDeliverySteps()
  const schema = useCreateDeliverySchemasStepper(currentStep)
  return (
    <FormDialog<
      | NewDeliveryStep1FormData
      | NewDeliveryStep2FormData
      | NewDeliveryStep3FormData
      | NewDeliveryStep4FormData
    >
      open={openDialog}
      title={translate('deliveries.newDelivery.title')}
      confirmText={translate('deliveries.newDelivery.labels.forward')}
      discardText={translate('deliveries.newDelivery.labels.back')}
      onCloseDialog={onCloseDialog}
      handleBack={handleBack}
      schema={schema}
      onSubmit={handleSubmit}
      //This key is not good
      // renderForm={(methods) => <NewDeliveryRenderForm {...methods} key={openDialog} />}
      renderForm={(methods) => <NewDeliveryRenderForm {...methods} />}
      steps={steps}
      currentStep={currentStep}
      isCompletedMove={isCompletedMove}
    />
  )
}
