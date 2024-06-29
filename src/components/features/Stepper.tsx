import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

interface HorizontalStepperProps {
  steps: string[]
  currentStep: number
}

export default function HorizontalStepper({ steps, currentStep }: HorizontalStepperProps) {
  return (
    <Box sx={{ width: '100%', marginBottom: '3em' }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}