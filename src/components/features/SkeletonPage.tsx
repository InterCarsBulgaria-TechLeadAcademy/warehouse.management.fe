import React from 'react'
import { Box } from '@mui/material'
import HeaderSkeletonPage from './HeaderSkeletonPage'
import VendorsTable from './VendorsTable'

interface SkeletonPageProps {
  header: string
  description: string
  buttonText?: string
  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

export default function SkeletonPage({
  header,
  description,
  buttonText,
  buttonClickHandler
}: SkeletonPageProps) {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        padding: '1em'
      }}>
      <HeaderSkeletonPage
        header={header}
        description={description}
        buttonText={buttonText}
        buttonClickHandler={buttonClickHandler}
      />

      <Box component="article" sx={{ background: 'white' }}>
        <VendorsTable />
      </Box>
    </Box>
  )
}
