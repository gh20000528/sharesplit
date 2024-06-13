import { useQuery } from '@tanstack/react-query';
import { getFriendlist } from './api';

export const useFriendList = (userId: string) => {
    return useQuery({
        queryKey: ['friendlist'],
        queryFn: async () => {
            console.log(userId);
            
            const result = await getFriendlist(userId)
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}

