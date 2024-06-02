export interface DataTableProps {
  hasSearchInput: boolean
  isSortTextField: boolean
  sortLabel?: string
  sortOptionsData?: string[]
  columnsData: Column[]
  rowData: any
}

export interface Column {
  key: string
  title: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
}
