import { IconButton, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ShowHideFunctionalityProps {
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

export default function ShowHideFunctionality({
  field,
  label,
  id,
  name,
  required,
  fullWidth,
  VisibilityOff,
  Visibility,
  color,
  error,
  helperText
}: ShowHideFunctionalityProps) {
  const { t: translate } = useTranslation()
  const [show, setShow] = React.useState(false)

  const handleClickShow = () => setShow((show) => !show)

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <TextField
      {...field}
      label={label}
      id={id}
      name={name}
      margin="normal"
      required={required}
      fullWidth={fullWidth}
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClickShow} onMouseDown={handleMouseDown}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      color={color}
      error={error}
      helperText={error ? translate(helperText || '') : ''}
    />
  )
}
