import { useFinishProcessingDifference } from '@/hooks/services/differences/useFinishProcessingDifference'
import { useNoDifferences } from '@/hooks/services/differences/useNoDifferences'
import { DifferenceDto } from '@/services/model'
import { Box, Button, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface CreateDifferenceFormProps {
  handleCloseForm: () => void
  difference: DifferenceDto
  action: string
}

export default function AdminCommentForm({
  handleCloseForm,
  difference,
  action
}: CreateDifferenceFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    adminComment: string
  }>({
    defaultValues: {
      adminComment: ''
    }
  })

  const { t: translate } = useTranslation()
  const differenceFinishProcessing = useFinishProcessingDifference()
  const noDifferences = useNoDifferences()

  const handleFormSubmit: SubmitHandler<{ adminComment: string }> = (data) => {
    switch (action) {
      case 'finishProcessing':
        differenceFinishProcessing.mutate({ id: difference.id!, adminComment: data.adminComment })
        break
      case 'noDifferences':
        noDifferences.mutate({ id: difference.id!, adminComment: data.adminComment })
        break
    }
    handleCloseForm()
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2em', alignItems: 'center' }}>
        <Controller
          name="adminComment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('differences.table.actions.finishProcessing.labels.admin-comment')}
              id="adminComment"
              name="adminComment"
              multiline
              rows={4}
              error={!!errors.adminComment}
              helperText={
                errors.adminComment?.message ? translate(errors.adminComment.message) : ''
              }
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleCloseForm}>
            {translate('differences.table.actions.finishProcessing.labels.discard')}
          </Button>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {translate('differences.table.actions.finishProcessing.labels.confirm')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
