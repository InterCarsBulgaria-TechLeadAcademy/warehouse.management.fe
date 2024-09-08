/**
 * [
 *     [
 *         "Marker.GetAll",
 *         "Marker.Add",
 *         "Marker.Restore",
 *         "Marker.GetAll",
 *         "Marker.Edit",
 *         "Marker.GetMarker",
 *         "Marker.GetDeletedMarkers",
 *         "Marker.Delete"
 *     ],
 *     [
 *         "Zone.Entries",
 *         "Zone.AllWithDeleted",
 *         "Zone.Edit",
 *         "Zone.GetAll",
 *         "Zone.Delete",
 *         "Zone.GetById",
 *         "Zone.GetAll",
 *         "Zone.AllWithDeleted",
 *         "Zone.Restore",
 *         "Zone.Add"
 *     ],
 *     [
 *         "Delivery.GetHistory",
 *         "Delivery.Delete",
 *         "Delivery.Edit",
 *         "Delivery.Add",
 *         "Delivery.GenerateBarcodePdf",
 *         "Delivery.AllDeleted",
 *         "Delivery.Approve",
 *         "Delivery.GetDelivery",
 *         "Delivery.GetDeliveries",
 *         "Delivery.Restore"
 *     ],
 *     [
 *         "DifferenceType.All",
 *         "DifferenceType.GetById",
 *         "DifferenceType.AllWithDeleted",
 *         "DifferenceType.Restore",
 *         "DifferenceType.Edit",
 *         "DifferenceType.Add",
 *         "DifferenceType.Delete"
 *     ],
 *     [
 *         "Entry.GetById",
 *         "Entry.Edit",
 *         "Entry.Split",
 *         "Entry.Add",
 *         "Entry.Restore",
 *         "Entry.Delete",
 *         "Entry.Move",
 *         "Entry.All",
 *         "Entry.AllWithDeleted",
 *         "Entry.FinishProcessing",
 *         "Entry.StartProcessing"
 *     ],
 *     [
 *         "Difference.Restore",
 *         "Difference.FinishProcessing",
 *         "Difference.NoDifferences",
 *         "Difference.Add",
 *         "Difference.GetById",
 *         "Difference.All",
 *         "Difference.Edit",
 *         "Difference.Delete",
 *         "Difference.AllWithDeleted",
 *         "Difference.StartProcessing"
 *     ],
 *     [
 *         "User.GetUserInfo",
 *         "User.GetAll",
 *         "User.Delete"
 *     ],
 *     [
 *         "Role.GetAll",
 *         "Role.GetById",
 *         "Role.AddUserToRole",
 *         "Role.Edit",
 *         "Role.Create",
 *         "Role.Delete"
 *     ],
 *     [
 *         "RoutePermission.GetById",
 *         "RoutePermission.Delete",
 *         "RoutePermission.GetAllWithDeleted",
 *         "RoutePermission.GetAll"
 *     ],
 *     [
 *         "Vendor.Restore",
 *         "Vendor.Add",
 *         "Vendor.Edit",
 *         "Vendor.All",
 *         "Vendor.AllDeleted",
 *         "Vendor.Delete",
 *         "Vendor.GetVendor"
 *     ],
 *     [
 *         "Auth.SignIn",
 *         "Auth.Logout",
 *         "Auth.SignUp",
 *         "Auth.Refresh"
 *     ]
 * ]
 */

export enum User {
  All = 'User.GetAll',
  Delete = 'User.Delete',
  GetUserInfo = 'User.GetUserInfo'
}

export enum Role {
  All = 'Role.GetAll',
  AddUserToRole = 'Role.AddUserToRole',
  Create = 'Role.Create',
  Delete = 'Role.Delete',
  Edit = 'Role.Edit',
  GetById = 'Role.GetById'
}

export enum RoutePermission {
  All = 'RoutePermission.GetAll',
  GetAllWithDeleted = 'RoutePermission.GetAllWithDeleted',
  Delete = 'RoutePermission.Delete',
  GetById = 'RoutePermission.GetById'
}

export enum Vendor {
  Add = 'Vendor.Add',
  All = 'Vendor.All',
  AllDeleted = 'Vendor.AllDeleted',
  Delete = 'Vendor.Delete',
  Edit = 'Vendor.Edit',
  GetVendor = 'Vendor.GetVendor',
  Restore = 'Vendor.Restore'
}

export enum Marker {
  Add = 'Marker.Add',
  Delete = 'Marker.Delete',
  Edit = 'Marker.Edit',
  GetAll = 'Marker.GetAll',
  GetDeletedMarkers = 'Marker.GetDeletedMarkers',
  GetMarker = 'Marker.GetMarker',
  Restore = 'Marker.Restore'
}

export enum Zone {
  Add = 'Zone.Add',
  AllWithDeleted = 'Zone.AllWithDeleted',
  Delete = 'Zone.Delete',
  Edit = 'Zone.Edit',
  Entries = 'Zone.Entries',
  GetAll = 'Zone.GetAll',
  GetById = 'Zone.GetById',
  Restore = 'Zone.Restore'
}

export enum Delivery {
  Add = 'Delivery.Add',
  AllDeleted = 'Delivery.AllDeleted',
  Approve = 'Delivery.Approve',
  Delete = 'Delivery.Delete',
  Edit = 'Delivery.Edit',
  GenerateBarcodePdf = 'Delivery.GenerateBarcodePdf',
  GetDelivery = 'Delivery.GetDelivery',
  GetDeliveries = 'Delivery.GetDeliveries',
  GetHistory = 'Delivery.GetHistory',
  Restore = 'Delivery.Restore'
}

export enum DifferenceType {
  Add = 'DifferenceType.Add',
  All = 'DifferenceType.All',
  AllWithDeleted = 'DifferenceType.AllWithDeleted',
  Delete = 'DifferenceType.Delete',
  Edit = 'DifferenceType.Edit',
  GetById = 'DifferenceType.GetById',
  Restore = 'DifferenceType.Restore'
}

export enum Entry {
  Add = 'Entry.Add',
  All = 'Entry.All',
  AllWithDeleted = 'Entry.AllWithDeleted',
  Delete = 'Entry.Delete',
  Edit = 'Entry.Edit',
  FinishProcessing = 'Entry.FinishProcessing',
  GetById = 'Entry.GetById',
  Move = 'Entry.Move',
  Restore = 'Entry.Restore',
  Split = 'Entry.Split',
  StartProcessing = 'Entry.StartProcessing'
}

export enum Difference {
  Add = 'Difference.Add',
  All = 'Difference.All',
  AllWithDeleted = 'Difference.AllWithDeleted',
  Delete = 'Difference.Delete',
  Edit = 'Difference.Edit',
  FinishProcessing = 'Difference.FinishProcessing',
  GetById = 'Difference.GetById',
  NoDifferences = 'Difference.NoDifferences',
  Restore = 'Difference.Restore',
  StartProcessing = 'Difference.StartProcessing'
}

export enum Auth {
  Logout = 'Auth.Logout',
  Refresh = 'Auth.Refresh',
  SignIn = 'Auth.SignIn',
  SignUp = 'Auth.SignUp'
}

export type Permissions =
  | User
  | Role
  | RoutePermission
  | Vendor
  | Marker
  | Zone
  | Delivery
  | DifferenceType
  | Entry
  | Difference
  | Auth
