import * as React from 'react'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

export interface FormDialogProps<T extends FieldValues> {
  open: boolean
  title: string
  discardText: string
  confirmText: string
  onCloseDialog: () => void
  schema: yup.ObjectSchema<T>
  onSubmit: SubmitHandler<T>
  renderForm: (methods: UseFormReturn<T>) => React.ReactNode
}
