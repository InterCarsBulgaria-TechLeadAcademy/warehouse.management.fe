import { EntryDto } from '@/services/model'
import { ChipStatus } from '@/hooks/useChipLabel.ts'

export function getEntryStatus(entry: EntryDto) {
  if (entry.startedProccessing && entry.finishedProccessing) {
    return ChipStatus.Finished
  }

  if (entry.startedProccessing) {
    return ChipStatus.Processing
  }

  return ChipStatus.Waiting
}
