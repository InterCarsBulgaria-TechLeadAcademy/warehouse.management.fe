export interface Column {
  key: string
  title: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
}
