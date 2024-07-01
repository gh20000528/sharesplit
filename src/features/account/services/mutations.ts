import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAccount  } from './api';
import { addAccountreq } from '../types/account';

export const useAddAccount = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (data: addAccountreq) => {
            const res = await addAccount(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}

