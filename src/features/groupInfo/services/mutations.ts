import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getGroupInfo } from './api';


export const useGroupInfo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (data: number) => {
            const res = await getGroupInfo(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}
