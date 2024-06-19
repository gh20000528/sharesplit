import { useQuery } from '@tanstack/react-query';
import { getNotif } from './api';


export const useNotif = () => {
    return useQuery({
        queryKey: ['notif'],
        queryFn: async () => {
            const result = await getNotif()
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}