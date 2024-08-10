import React from 'react'
import { useTranslation } from 'react-i18next'
import { EntryDto } from '@/services/model'
import TableActionsMenu from './TableActionsMenu'

interface ZonesTableActionsMenuProps {
  entry: EntryDto
}

export default function ZonesContentTableActionsMenu({ entry }: ZonesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const options = [
    { title: 'actionsMenu.options.move', value: 'move' },
    { title: 'actionsMenu.options.startProcessing', value: 'startProcessing' },
    { title: 'actionsMenu.options.finishProcessing', value: 'finishProcessing' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />
    </div>
  )
}
