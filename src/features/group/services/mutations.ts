import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGroup, editGroup, softGroup } from './api';
import { addGroupReq, editGroupReq } from '../types/group';

export const useAddGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['grouplist'],
        mutationFn: async (data: addGroupReq) => {
            const res = await addGroup(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grouplist'] })
        }
    })
}

export const useEditGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['grouplist'],
        mutationFn: async (data: editGroupReq) => {
            const res = await editGroup(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grouplist'] })
        }
    })
}

export const useSoftGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['grouplist'],
        mutationFn: async (id: string) => {
            const res = await softGroup(id)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grouplist'] })
        }
    })
}