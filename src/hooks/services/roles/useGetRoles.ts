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
        id: 1, name: 'regular', rights: [
          {
            rightId: 1,
            rightName: 'createZones'
          },
          {
            rightId: 2,
            rightName: 'readZones'
          },
        ]
      },
      {
        id: 2, name: 'admin', rights: [
          {
            rightId: 1,
            rightName: 'deleteZones'
          },
          {
            rightId: 2,
            rightName: 'editZones'
          },
          {
            rightId: 3,
            rightName: 'readZones'
          },
          {
            rightId: 4,
            rightName: 'createZones'
          },
        ]
      },
    ];
  
    return data;
  }