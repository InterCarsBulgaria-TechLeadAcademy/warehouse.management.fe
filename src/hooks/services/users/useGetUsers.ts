// import { getWarehouseManagementApi } from '@/services/generated-api'
// import { useSuspenseQuery } from '@tanstack/react-query'

// export default function useGetUsers() {
//   const { data } = useSuspenseQuery({
//     queryKey: ['users'],
//     queryFn: () => {
//       return getWarehouseManagementApi().getApiUserAll()
//     }
//   })

//   return data
// }

export default function useGetUsers() {
  const data: any[] = [
    {
      id: 1, name: 'Ico', email: 'ico@abv.bg', role: 'regular', rights: [
        {
          rightId: 1,
          rightName: 'Създаване на зони'
        },
        {
          rightId: 2,
          rightName: 'Четене на зони'
        },
      ], dateCreated: '12-08-2024'
    },
    {
      id: 2, name: 'Kris', email: 'kris@abv.bg', role: 'admin', rights: [
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
      ], dateCreated: '12-08-2024'
    },
  ];

  return data;
}