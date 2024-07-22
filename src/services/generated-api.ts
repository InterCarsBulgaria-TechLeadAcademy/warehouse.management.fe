/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * WarehouseManagement.Api
 * OpenAPI spec version: 1.0
 */
import type {
  DeliveryDto,
  DeliveryFormDto,
  DeliveryHistoryDto,
  DifferenceTypeDto,
  DifferenceTypeFormDto,
  EntryDto,
  EntryFormDto,
  EntryRequest,
  GetApiDeliveryAllParams,
  GetApiDeliveryHistoryIdParams,
  GetApiMarkerAllWithParamsParams,
  GetApiVendorAllParams,
  GetApiZoneAllWithParamsParams,
  GetApiZoneEntriesParams,
  MarkerDto,
  MarkerFormDto,
  PaginationParameters,
  VendorDto,
  VendorFormDto,
  ZoneDto,
  ZoneFormDto
} from './model'
import { customInstance } from './api'
import type { BodyType } from './api'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const getWarehouseManagementApi = () => {
  const getApiDeliveryId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DeliveryDto>({ url: `/api/Delivery/${id}`, method: 'GET' }, options)
  }

  const getApiDeliveryAll = (
    params?: GetApiDeliveryAllParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<DeliveryDto[]>(
      { url: `/api/Delivery/all`, method: 'GET', params },
      options
    )
  }

  const postApiDeliveryAdd = (
    deliveryFormDto: BodyType<DeliveryFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Delivery/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: deliveryFormDto
      },
      options
    )
  }

  const putApiDeliveryEditId = (
    id: number,
    deliveryFormDto: BodyType<DeliveryFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Delivery/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: deliveryFormDto
      },
      options
    )
  }

  const deleteApiDeliveryDeleteId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>({ url: `/api/Delivery/delete/${id}`, method: 'DELETE' }, options)
  }

  const putApiDeliveryRestoreId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>({ url: `/api/Delivery/restore/${id}`, method: 'PUT' }, options)
  }

  const getApiDeliveryAllDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DeliveryDto[]>(
      { url: `/api/Delivery/all-deleted`, method: 'GET' },
      options
    )
  }

  const getApiDeliveryHistoryId = (
    id: string,
    params?: GetApiDeliveryHistoryIdParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<DeliveryHistoryDto>(
      { url: `/api/Delivery/history/${id}`, method: 'GET', params },
      options
    )
  }

  const getApiDifferenceTypeAll = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto[]>(
      { url: `/api/DifferenceType/all`, method: 'GET' },
      options
    )
  }

  const getApiDifferenceTypeAllWithDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto[]>(
      { url: `/api/DifferenceType/all-with-deleted`, method: 'GET' },
      options
    )
  }

  const getApiDifferenceTypeId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto>(
      { url: `/api/DifferenceType/${id}`, method: 'GET' },
      options
    )
  }

  const postApiDifferenceTypeAdd = (
    differenceTypeFormDto: BodyType<DifferenceTypeFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/DifferenceType/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: differenceTypeFormDto
      },
      options
    )
  }

  const putApiDifferenceTypeEditId = (
    id: number,
    differenceTypeFormDto: BodyType<DifferenceTypeFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/DifferenceType/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: differenceTypeFormDto
      },
      options
    )
  }

  const deleteApiDifferenceTypeDeleteId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      { url: `/api/DifferenceType/delete/${id}`, method: 'DELETE' },
      options
    )
  }

  const putApiDifferenceTypeRestoreId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      { url: `/api/DifferenceType/restore/${id}`, method: 'PUT' },
      options
    )
  }

  const getApiEntry = (
    entryRequest: BodyType<EntryRequest>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<DeliveryHistoryDto>(
      { url: `/api/Delivery/history/${id}`, method: 'GET', params },
      options
    )
  }

  const putApiDeliveryApproveId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<VendorDto[]>(
      { url: `/api/Delivery/Approve/${id}`, method: 'PUT' },
      options
    )
  }

  const getApiDifferenceTypeAll = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto[]>(
      { url: `/api/DifferenceType/all`, method: 'GET' },
      options
    )
  }

  const getApiDifferenceTypeAllWithDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto[]>(
      { url: `/api/DifferenceType/all-with-deleted`, method: 'GET' },
      options
    )
  }

  const getApiDifferenceTypeId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<DifferenceTypeDto>(
      { url: `/api/DifferenceType/${id}`, method: 'GET' },
      options
    )
  }

  const postApiDifferenceTypeAdd = (
    differenceTypeFormDto: BodyType<DifferenceTypeFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/DifferenceType/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: differenceTypeFormDto
      },
      options
    )
  }

  const putApiDifferenceTypeEditId = (
    id: number,
    differenceTypeFormDto: BodyType<DifferenceTypeFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/DifferenceType/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: differenceTypeFormDto
      },
      options
    )
  }

  const deleteApiDifferenceTypeDeleteId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      { url: `/api/DifferenceType/delete/${id}`, method: 'DELETE' },
      options
    )
  }

  const putApiDifferenceTypeRestoreId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      { url: `/api/DifferenceType/restore/${id}`, method: 'PUT' },
      options
    )
  }

  const getApiEntryAll = (
    params?: GetApiEntryAllParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<EntryDto[]>({ url: `/api/Entry/all`, method: 'GET', params }, options)
  }

  const getApiEntryId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<EntryDto>({ url: `/api/Entry/${id}`, method: 'GET' }, options)
  }

  const getApiEntryAllWithDeleted = (
    entryRequest: BodyType<EntryRequest>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<EntryDto[]>(
      {
        url: `/api/Entry/all-with-deleted`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      },
      options
    )
  }

  const postApiEntryAdd = (
    entryFormDto: EntryFormDto[],
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Entry/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: entryFormDto
      },
      options
    )
  }

  const putApiEntryEditId = (
    id: number,
    entryFormDto: BodyType<EntryFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Entry/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: entryFormDto
      },
      options
    )
  }

  const deleteApiEntryDeleteId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Entry/delete/${id}`, method: 'DELETE' }, options)
  }

  const putApiEntryRestoreId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Entry/restore/${id}`, method: 'PUT' }, options)
  }

  const getApiEntryStartId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Entry/start/${id}`, method: 'GET' }, options)
  }

  const getApiEntryFinishId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Entry/finish/${id}`, method: 'GET' }, options)
  }

  const getApiMarkerId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<MarkerDto>({ url: `/api/Marker/${id}`, method: 'GET' }, options)
  }

  const getApiMarkerAll = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<MarkerDto[]>({ url: `/api/Marker/all`, method: 'GET' }, options)
  }

  const getApiMarkerAllWithParams = (
    params?: GetApiMarkerAllWithParamsParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<MarkerDto[]>(
      { url: `/api/Marker/all-with-params`, method: 'GET', params },
      options
    )
  }

  const postApiMarkerAdd = (
    markerFormDto: BodyType<MarkerFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Marker/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: markerFormDto
      },
      options
    )
  }

  const putApiMarkerEditId = (
    id: number,
    markerFormDto: BodyType<MarkerFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Marker/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: markerFormDto
      },
      options
    )
  }

  const deleteApiMarkerDeleteId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>({ url: `/api/Marker/delete/${id}`, method: 'DELETE' }, options)
  }

  const putApiMarkerRestoreId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Marker/restore/${id}`, method: 'PUT' }, options)
  }

  const getApiMarkerDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<MarkerDto[]>({ url: `/api/Marker/deleted`, method: 'GET' }, options)
  }

  const getApiVendorId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<VendorDto>({ url: `/api/Vendor/${id}`, method: 'GET' }, options)
  }

  const getApiVendorAll = (
    params?: GetApiVendorAllParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<VendorDto[]>({ url: `/api/Vendor/all`, method: 'GET', params }, options)
  }

  const postApiVendorAdd = (
    vendorFormDto: BodyType<VendorFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Vendor/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: vendorFormDto
      },
      options
    )
  }

  const putApiVendorEditId = (
    id: number,
    vendorFormDto: BodyType<VendorFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Vendor/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: vendorFormDto
      },
      options
    )
  }

  const deleteApiVendorDeleteId = (
    id: number,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>({ url: `/api/Vendor/delete/${id}`, method: 'DELETE' }, options)
  }

  const putApiVendorRestoreId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Vendor/restore/${id}`, method: 'PUT' }, options)
  }

  const getApiVendorAllDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<VendorDto[]>({ url: `/api/Vendor/all-deleted`, method: 'GET' }, options)
  }

  const getApiZoneId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<ZoneDto>({ url: `/api/Zone/${id}`, method: 'GET' }, options)
  }

  const getApiZoneAll = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<ZoneDto[]>({ url: `/api/Zone/all`, method: 'GET' }, options)
  }

  const getApiZoneAllWithParams = (
    params?: GetApiZoneAllWithParamsParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<ZoneDto[]>(
      { url: `/api/Zone/all-with-params`, method: 'GET', params },
      options
    )
  }

  const postApiZoneAdd = (
    zoneFormDto: BodyType<ZoneFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Zone/add`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: zoneFormDto
      },
      options
    )
  }

  const putApiZoneEditId = (
    id: number,
    zoneFormDto: BodyType<ZoneFormDto>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<void>(
      {
        url: `/api/Zone/edit/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        data: zoneFormDto
      },
      options
    )
  }

  const deleteApiZoneDeleteId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Zone/delete/${id}`, method: 'DELETE' }, options)
  }

  const putApiZoneRestoreId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<void>({ url: `/api/Zone/restore/${id}`, method: 'PUT' }, options)
  }

  const getApiZoneAllWithDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<ZoneDto[]>({ url: `/api/Zone/all-with-deleted`, method: 'GET' }, options)
  }

  const getApiZoneAllWithDeletedWithParams = (
    paginationParameters: BodyType<PaginationParameters>,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<ZoneDto[]>(
      {
        url: `/api/Zone/all-with-deleted-with-params`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      },
      options
    )
  }

  const getApiZoneEntries = (
    params?: GetApiZoneEntriesParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<EntryDto[]>({ url: `/api/Zone/entries`, method: 'GET', params }, options)
  }

  return {
    getApiDeliveryId,
    getApiDeliveryAll,
    postApiDeliveryAdd,
    putApiDeliveryEditId,
    deleteApiDeliveryDeleteId,
    putApiDeliveryRestoreId,
    getApiDeliveryAllDeleted,
    getApiDeliveryHistoryId,
    getApiDifferenceTypeAll,
    getApiDifferenceTypeAllWithDeleted,
    getApiDifferenceTypeId,
    postApiDifferenceTypeAdd,
    putApiDifferenceTypeEditId,
    deleteApiDifferenceTypeDeleteId,
    putApiDifferenceTypeRestoreId,
    getApiEntry,
    getApiEntryId,
    getApiEntryAllWithDeleted,
    postApiEntryAdd,
    putApiEntryEditId,
    deleteApiEntryDeleteId,
    putApiEntryRestoreId,
    getApiEntryStartId,
    getApiEntryFinishId,
    getApiMarkerId,
    getApiMarkerAll,
    getApiMarkerAllWithParams,
    postApiMarkerAdd,
    putApiMarkerEditId,
    deleteApiMarkerDeleteId,
    putApiMarkerRestoreId,
    getApiMarkerDeleted,
    getApiVendorId,
    getApiVendorAll,
    postApiVendorAdd,
    putApiVendorEditId,
    deleteApiVendorDeleteId,
    putApiVendorRestoreId,
    getApiVendorAllDeleted,
    getApiZoneId,
    getApiZoneAll,
    getApiZoneAllWithParams,
    postApiZoneAdd,
    putApiZoneEditId,
    deleteApiZoneDeleteId,
    putApiZoneRestoreId,
    getApiZoneAllWithDeleted,
    getApiZoneAllWithDeletedWithParams,
    getApiZoneEntries
  }
}
export type GetApiDeliveryIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDeliveryId']>>
>
export type GetApiDeliveryAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDeliveryAll']>>
>
export type PostApiDeliveryAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiDeliveryAdd']>>
>
export type PutApiDeliveryEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiDeliveryEditId']>>
>
export type DeleteApiDeliveryDeleteIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiDeliveryDeleteId']>>
>
export type PutApiDeliveryRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiDeliveryRestoreId']>>
>
export type GetApiDeliveryAllDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDeliveryAllDeleted']>>
>
export type GetApiDeliveryHistoryIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDeliveryHistoryId']>>
>
export type GetApiDifferenceTypeAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDifferenceTypeAll']>>
>
export type GetApiDifferenceTypeAllWithDeletedResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDifferenceTypeAllWithDeleted']>
  >
>
export type GetApiDifferenceTypeIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiDifferenceTypeId']>>
>
export type PostApiDifferenceTypeAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiDifferenceTypeAdd']>>
>
export type PutApiDifferenceTypeEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiDifferenceTypeEditId']>>
>
export type DeleteApiDifferenceTypeDeleteIdResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiDifferenceTypeDeleteId']>
  >
>
export type PutApiDifferenceTypeRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiDifferenceTypeRestoreId']>>
>
export type GetApiEntryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiEntry']>>
>
export type GetApiEntryIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiEntryId']>>
>
export type GetApiEntryAllWithDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiEntryAllWithDeleted']>>
>
export type PostApiEntryAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiEntryAdd']>>
>
export type PutApiEntryEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiEntryEditId']>>
>
export type DeleteApiEntryDeleteIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiEntryDeleteId']>>
>
export type PutApiEntryRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiEntryRestoreId']>>
>
export type GetApiEntryStartIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiEntryStartId']>>
>
export type GetApiEntryFinishIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiEntryFinishId']>>
>
export type GetApiMarkerIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerId']>>
>
export type GetApiMarkerAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerAll']>>
>
export type GetApiMarkerAllWithParamsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerAllWithParams']>>
>
export type PostApiMarkerAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiMarkerAdd']>>
>
export type PutApiMarkerEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiMarkerEditId']>>
>
export type DeleteApiMarkerDeleteIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiMarkerDeleteId']>>
>
export type PutApiMarkerRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiMarkerRestoreId']>>
>
export type GetApiMarkerDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerDeleted']>>
>
export type GetApiVendorIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiVendorId']>>
>
export type GetApiVendorAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiVendorAll']>>
>
export type PostApiVendorAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiVendorAdd']>>
>
export type PutApiVendorEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiVendorEditId']>>
>
export type DeleteApiVendorDeleteIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiVendorDeleteId']>>
>
export type PutApiVendorRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiVendorRestoreId']>>
>
export type GetApiVendorAllDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiVendorAllDeleted']>>
>
export type GetApiZoneIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneId']>>
>
export type GetApiZoneAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneAll']>>
>
export type GetApiZoneAllWithParamsResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneAllWithParams']>>
>
export type PostApiZoneAddResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['postApiZoneAdd']>>
>
export type PutApiZoneEditIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiZoneEditId']>>
>
export type DeleteApiZoneDeleteIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['deleteApiZoneDeleteId']>>
>
export type PutApiZoneRestoreIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['putApiZoneRestoreId']>>
>
export type GetApiZoneAllWithDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneAllWithDeleted']>>
>
export type GetApiZoneAllWithDeletedWithParamsResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneAllWithDeletedWithParams']>
  >
>
export type GetApiZoneEntriesResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneEntries']>>
>
