import React from 'react';
import { useLogin } from './services/mutations';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useLoggedIn from '../../store/useLoggedIn';
import { useUserProfile } from './services/queries';

const SignIn = () => {
    const {data, isLoading, error} = useUserProfile()
    const { mutate: loginMutation} = useLogin();
    const navigate = useNavigate();
    const setIsLoggedIn = useLoggedIn((state) => state.setIsLoggedIn)
    
    const handleLogin = () => {
        loginMutation(undefined, {
            onSuccess: () => {
                setIsLoggedIn(true, { username: data.username })
                navigate('/');
            }
        });
    };

    return (
        <div>
            <h1>Login</h1>
            <Button onClick={handleLogin}>
                'Login with Google'
            </Button>
        </div>
    );
};

export default SignIn;
