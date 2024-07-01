import { useQuery } from '@tanstack/react-query';
import { getAccountlist } from './api';

export const useAccountList = (groupId: string) => {
    return useQuery({
        queryKey: ['friendlist'],
        queryFn: async () => {
            const result = await getAccountlist(groupId)
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}

