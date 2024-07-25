/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * WarehouseManagement.Api
 * OpenAPI spec version: 1.0
 */
import type { EntryDto } from './entryDto'
import type { DeliveryMarkerDto } from './deliveryMarkerDto'

export interface DeliveryDto {
  /** @nullable */
  approvedOn?: string | null
  /** @nullable */
  cmr?: string | null
  deliveryTime?: string
  /** @nullable */
  entries?: EntryDto[] | null
  entriesFinishedProcessing?: number
  entriesWaitingProcessing?: number
  id?: number
  /** @nullable */
  markers?: DeliveryMarkerDto[] | null
  packages?: number
  pallets?: number
  pieces?: number
  /** @nullable */
  receptionNumber?: string | null
  /** @nullable */
  status?: string | null
  /** @nullable */
  systemNumber?: string | null
  /** @nullable */
  truckNumber?: string | null
  vendorId?: number
  /** @nullable */
  vendorName?: string | null
}
