/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * WarehouseManagement.Api
 * OpenAPI spec version: 1.0
 */
import type { VendorMarkerDto } from './vendorMarkerDto'

export interface VendorDto {
  createdAt?: string
  id?: number
  /** @nullable */
  markers?: VendorMarkerDto[] | null
  /** @nullable */
  name?: string | null
  /** @nullable */
  systemNumber?: string | null
}
