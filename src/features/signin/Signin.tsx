import React from 'react';
import { useLogin } from './services/mutations';
import { Box, Button, Center, Heading } from '@chakra-ui/react';
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
        <Center minHeight="100vh">
            <Box alignItems="center">
                <Heading m="30px" fontSize="60px">歡迎使用 ShareSplit</Heading>
                <Button onClick={handleLogin} colorScheme='teal' fontSize="20px" px="40px">
                    使用 Google 登入
                </Button>
            </Box>
        </Center>
    );
};

export default SignIn;
