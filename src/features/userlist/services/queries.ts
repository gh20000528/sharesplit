import { useQuery } from '@tanstack/react-query';
import { userList } from './api';

export const useUserList = () => {
    return useQuery({
        queryKey: ['userlist'],
        queryFn: async () => {
            const result = await userList()
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}