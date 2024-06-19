import { useQuery } from '@tanstack/react-query';
import { getGroupInfo } from './api';

export const useGroupInfo = (groupId: number) => {
    return useQuery({
        queryKey: ['friendlist'],
        queryFn: async () => {
            
            const result = await getGroupInfo(groupId)
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}

