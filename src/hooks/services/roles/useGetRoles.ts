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
            rightName: 'Създаване на зони'
          },
          {
            rightId: 2,
            rightName: 'Четене на зони'
          },
        ]
      },
      {
        id: 2, name: 'admin', rights: [
          {
            rightId: 1,
            rightName: 'Триене на зони'
          },
          {
            rightId: 2,
            rightName: 'Редактиране на зони'
          },
          {
            rightId: 3,
            rightName: 'Четене на зони'
          },
          {
            rightId: 4,
            rightName: 'Създаване на зони'
          },
        ]
      },
    ];
  
    return data;
  }