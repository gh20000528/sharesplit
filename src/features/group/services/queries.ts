import { useQuery } from '@tanstack/react-query';
import {getGroupList} from './api';

export const useGroupList = () => {
    return useQuery({
        queryKey: ['grouplist'],
        queryFn: async () => {
            const result = await getGroupList()
            return result.data
        },
        staleTime: 5 * 60 * 1000
    })
}