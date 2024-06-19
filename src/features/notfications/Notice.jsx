import { Badge, Box, Button, Flex, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EmailIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useNotif } from './services/queries';
import { useAcceptFriend } from '../friend/services/mutations';
import { io } from 'socket.io-client';
import { useUserProfile } from '../signin/services/queries';

const Notif = () => {
    const [hasNewNotifications, setHasNewNotifications] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const { data, isLoading } = useNotif();
    const { mutateAsync: acceptFriend } = useAcceptFriend();
    const { data: userProfile } = useUserProfile(); // 获取用户信息

    useEffect(() => {
        if (!userProfile || !userProfile.id) return;

        const socket = io(`http://localhost:3003`, {
            query: { userId: userProfile.id }
        });

        socket.on('notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setHasNewNotifications(true);
        });

        return () => {
            socket.disconnect();
        };
    }, [userProfile]);

    useEffect(() => {
        if (data && data.length > 0) {
            setNotifications(data);
            setHasNewNotifications(true);
        } else {
            setHasNewNotifications(false);
        }
    }, [data]);

    const handlerAdd = async (reqId) => {
        await acceptFriend(reqId);
        setNotifications(prev => prev.filter(notification => notification.id !== reqId));
    };

    const handlerDelete = async (reqId) => {
        // 可以在这里添加删除请求的逻辑，如果需要
        setNotifications(prev => prev.filter(notification => notification.id !== reqId));
    };

    const renderNotification = (notification, index) => {
        if (notification.type === 'friend_request') {
            return (
                <Box key={index} p={2} borderBottom="1px solid gray">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            {notification.message}
                            <Box fontSize="sm" color="gray.500">
                                {new Date(notification.createdAt).toLocaleString()}
                            </Box>
                        </Box>
                        <Button my={2} colorScheme='teal' onClick={() => handlerAdd(notification.id)}><CheckIcon/></Button>
                        <Button ml={2} colorScheme='red' onClick={() => handlerDelete(notification.id)}><CloseIcon/></Button>
                    </Flex>
                </Box>
            );
        } else if (notification.type === 'friend_accepted') {
            return (
                <Box key={index} p={2} borderBottom="1px solid gray">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            {notification.message}
                            <Box fontSize="sm" color="gray.500">
                                {new Date(notification.createdAt).toLocaleString()}
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            );
        } else {
            return null;
        }
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Box position="relative" cursor="pointer">
                    <EmailIcon w={6} h={6} color="white" />
                    {hasNewNotifications && (
                        <Badge
                            position="absolute"
                            top="-1"
                            right="-1"
                            borderRadius="full"
                            bg="red.500"
                            color="white"
                            px={1}
                            py={1}
                            fontSize="xs"
                        >
                        </Badge>
                    )}
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>通知</PopoverHeader>
                <PopoverBody textAlign="left">
                    {isLoading ? (
                        <Box p={2}>加载中...</Box>
                    ) : notifications.length > 0 ? (
                        notifications.map(renderNotification)
                    ) : (
                        <Box p={2}>目前没有通知</Box>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default Notif;
