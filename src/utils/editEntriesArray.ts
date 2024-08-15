import { EntryDto } from '@/services/model'

interface EditedEntry {
  goodType: string
  goodQuantity: number
  zone: number
}

export default function editEntriesArray(array: EntryDto[]) {
  const editedArray: EditedEntry[] = []
  array?.map((entry: EntryDto) => {
    const objectForPush: EditedEntry = { goodType: '', goodQuantity: 0, zone: 0 }
    for (const [key, value] of Object.entries(entry)) {
      if (key === 'pallets' && value !== 0) {
        objectForPush.goodType = 'pallets'
        objectForPush.goodQuantity = Number(value)
      } else if (key === 'packages' && value !== 0) {
        objectForPush.goodType = 'pallets'
        objectForPush.goodQuantity = Number(value)
      } else if (key === 'pieces' && value !== 0) {
        objectForPush.goodType = 'pieces'
        objectForPush.goodQuantity = Number(value)
      } else if (key === 'zone') {
        objectForPush.zone = value.zoneName
      }
    }
    editedArray.push(objectForPush)
  })
  return editedArray
}
