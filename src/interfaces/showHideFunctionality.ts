export interface ShowHideFunctionalityProps {
  field: any
  label: string
  id: string
  name: string
  required?: boolean
  fullWidth?: boolean
  VisibilityOff: React.ElementType
  Visibility: React.ElementType
  color?: string
  error?: boolean
  helperText?: string | undefined
}
