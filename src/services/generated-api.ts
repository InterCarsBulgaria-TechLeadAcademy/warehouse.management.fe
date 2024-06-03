/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * WarehouseManagement.Api
 * OpenAPI spec version: 1.0
 */
import type {
  GetApiMarkerAllParams,
  MarkerDto,
  MarkerFormDto,
  VendorDto,
  VendorFormDto,
  ZoneDto,
  ZoneFormDto
} from './model'
import { customInstance } from './api'
import type { BodyType } from './api'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const getWarehouseManagementApi = () => {
  const getApiMarkerId = (id: number, options?: SecondParameter<typeof customInstance>) => {
    return customInstance<MarkerDto>({ url: `/api/Marker/${id}`, method: 'GET' }, options)
  }

  const getApiMarkerAll = (
    params?: GetApiMarkerAllParams,
    options?: SecondParameter<typeof customInstance>
  ) => {
    return customInstance<MarkerDto[]>({ url: `/api/Marker/all`, method: 'GET', params }, options)
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

  const getApiVendorAll = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<VendorDto[]>({ url: `/api/Vendor/all`, method: 'GET' }, options)
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

  const getApiZoneDeleted = (options?: SecondParameter<typeof customInstance>) => {
    return customInstance<ZoneDto[]>({ url: `/api/Zone/deleted`, method: 'GET' }, options)
  }

  return {
    getApiMarkerId,
    getApiMarkerAll,
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
    postApiZoneAdd,
    putApiZoneEditId,
    deleteApiZoneDeleteId,
    putApiZoneRestoreId,
    getApiZoneDeleted
  }
}
export type GetApiMarkerIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerId']>>
>
export type GetApiMarkerAllResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiMarkerAll']>>
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
export type GetApiZoneDeletedResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getWarehouseManagementApi>['getApiZoneDeleted']>>
>
