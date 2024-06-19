import React, { useEffect } from 'react';
import { useLogin } from './services/mutations';
import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useLoggedIn from '../../store/useLoggedIn';
import { useUserProfile } from './services/queries';

const SignIn = () => {
    const {data: userProfile, refetch } = useUserProfile()
    const { mutate: loginMutation} = useLogin();
    const navigate = useNavigate();
    const setIsLoggedIn = useLoggedIn((state) => state.setIsLoggedIn)

    // 确保在用户信息更新时设置登录状态并导航到首页
    useEffect(() => {
        if (userProfile && userProfile.id) {
            setIsLoggedIn(true, { username: userProfile.username });
            navigate('/home/group'); // 确保在获取用户信息后导航到主页
        }
    }, [userProfile, setIsLoggedIn, navigate]);

    const handleLogin = () => {
        loginMutation(undefined, {
            onSuccess: () => {
                refetch(); // 登录成功后重新获取用户信息
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
