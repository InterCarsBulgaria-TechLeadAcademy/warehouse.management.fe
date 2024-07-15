export interface Column<T> {
  key: keyof T
  title: string
  minWidth?: number
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify'
}
