import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { TextField, Chip, Box, InputAdornment } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ComboBoxProps {
  value: string[]
  onChange: (tags: string[]) => void
  errors: any
  label: string
}

export default function ComboBox({ value, onChange, errors, label }: ComboBoxProps) {
  const { t: translate } = useTranslation()

  const [inputValue, setInputValue] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const trimmedValue = inputValue.trim()
      if (trimmedValue === '') {
        setMessage(
          translate(
            'deliveries.newDelivery.labels.step1.comboBox.messages.systemNumber.emptySystemNumber'
          )
        )
      } else if (value.includes(trimmedValue)) {
        setMessage(
          translate(
            'deliveries.newDelivery.labels.step1.comboBox.messages.systemNumber.existSystemNumber'
          )
        )
      } else {
        onChange([...value, trimmedValue])
        setInputValue('')
        setMessage('')
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (message) {
      setMessage('')
    }
  }

  const handleDelete = (tagToDelete: string) => {
    onChange(value.filter((tag) => tag !== tagToDelete))
  }

  const handleBlur = () => {
    setInputValue('')
  }

  const errorMessage = errors?.message ? translate(errors.message) : message
  const helperText =
    errorMessage ||
    (inputValue &&
      translate('deliveries.newDelivery.labels.step1.comboBox.messages.systemNumber.pressEnter'))

  return (
    <Box>
      <TextField
        label={label}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        fullWidth
        required={value.length === 0} // when is empty to display * and message
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {value.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDelete(tag)}
                  style={{ marginRight: 5, marginBottom: 5, cursor: 'pointer' }}
                />
              ))}
            </InputAdornment>
          )
        }}
        error={!!errorMessage}
        helperText={helperText}
      />
    </Box>
  )
}
