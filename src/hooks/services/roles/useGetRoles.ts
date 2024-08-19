// import { getWarehouseManagementApi } from '@/services/generated-api'
// import { useSuspenseQuery } from '@tanstack/react-query'

// export default function useGetRoles() {
//   const { data } = useSuspenseQuery({
//     queryKey: ['roles'],
//     queryFn: () => {
//       return getWarehouseManagementApi().getApiRoleAll()
//     }
//   })

//   return data
// }

export default function useGetRoles() {
    const data: any[] = [
      {
        id: 1, name: 'regular', permissions: [
          {
            rightId: 1,
            permissionName: 'createZones'
          },
          {
            rightId: 2,
            permissionName: 'readZones'
          },
        ]
      },
      {
        id: 2, name: 'admin', permissions: [
          {
            rightId: 1,
            permissionName: 'deleteZones'
          },
          {
            rightId: 2,
            permissionName: 'editZones'
          },
          {
            rightId: 3,
            permissionName: 'readZones'
          },
          {
            rightId: 4,
            permissionName: 'createZones'
          },
        ]
      },
    ];
  
    return data;
  }