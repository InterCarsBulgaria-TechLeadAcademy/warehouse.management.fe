export default function useTranslateGoodTypeToEnglish(value: string | null): string | null {
  if (!value) {
    return null
  }

  switch (value) {
    case 'Палети':
      return 'pallets'
    case 'Пакети':
      return 'packages'
    case 'Бройки':
      return 'pieces'
    default:
      return value
  }
}
