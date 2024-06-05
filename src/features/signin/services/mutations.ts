import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginWithGoogle, logout } from './api';


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['userProfile'],
        mutationFn: async () => {
            const res = await loginWithGoogle()
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userprofile'] })
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['userProfile'],
        mutationFn: async () => {
            const res = await logout()
            return res;
        }
    })
}