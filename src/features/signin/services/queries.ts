import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from './api';
import Cookies from 'js-cookie';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const result = await getUserProfile()
            return result.data
        },
        staleTime: 5 * 60 * 1000 
    });
}