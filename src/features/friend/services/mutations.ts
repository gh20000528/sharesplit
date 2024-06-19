import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFriend, addFriend, deletedFriend, searchUser } from './api';
import { FriendReq } from '../types/friend';

export const useAddFriend = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (data: FriendReq) => {
            const res = await addFriend(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}

export const useDeleteFriend = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (data: FriendReq) => {
            const res = await deletedFriend(data)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}

export const useSearch = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (searchTerm: string) => {
            const res = await searchUser(searchTerm)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}

export const useAcceptFriend = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:['friendlist'],
        mutationFn: async (requestId: number) => {
            const res = await acceptFriend(requestId)
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['friendlist'] })
        }
    })
}