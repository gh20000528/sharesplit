import { Avatar, Box, Button, Center, Flex, Input, Text, VStack } from '@chakra-ui/react';
import { useFriendList } from './services/queries';
import { useParams } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAddFriend, useDeleteFriend, useSearch } from './services/mutations';

const Friend = () => {
    const { userId } = useParams();
    const [searchTerm, setsearchTerm] = useState('');
    const { data, error, isLoading } = useFriendList(Number(userId));
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchRes, setSearchReq] = useState([]);
    const { mutateAsync: searchUser } = useSearch();
    const { mutateAsync: addFriend } = useAddFriend();
    const { mutateAsync: deleteFriend } = useDeleteFriend();

    const handlerSearch = async () => {
        if (!searchTerm.trim()) {
            return;
        }
        const res = await searchUser(searchTerm);
        setSearchReq(res.data);
        setIsSearchVisible(true);
    };

    const handleAddFriend = async (friendId) => {
        await addFriend({ userId: Number(userId), friendId: Number(friendId) });
        setIsSearchVisible(false);
    };

    const handleCloseSearch = () => {
        setIsSearchVisible(false); // 隐藏搜索结果窗口
    };

    const handleDelete = async (friendId) => {
        await deleteFriend({ userId: Number(userId), friendId: Number(friendId) });
    };

    if (isLoading) {
        return <div>Loading ....</div>;
    }

    return (
        <Box shadow="md" borderWidth="1px" borderRadius="10px" height="600px" p="10px" position="relative">
            <Flex>
                <Input
                    placeholder='搜尋好友 ...'
                    value={searchTerm}
                    variant="flushed"
                    p={5}
                    onChange={(e) => setsearchTerm(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handlerSearch}><SearchIcon /></Button>
            </Flex>
            <VStack spacing={4} align="stretch" mt={4} h="100%">
                {data && data.length > 0 ? (
                    data.map((friend) => (
                        <Box key={friend.id} p={4} borderBottomWidth="1px">
                            <Flex justifyContent="space-around" alignItems="center">
                                <Avatar size="md" src={friend.profilePicture} alt={friend.name} />
                                <Box>
                                    <Text textAlign="left">名稱: {friend.name}</Text>
                                    <Text textAlign="left">信箱: {friend.email}</Text>
                                </Box>
                                <Box>
                                    <Button mr={4} colorScheme="teal">邀請加入</Button>
                                    <Button ml={4} colorScheme="red" onClick={() => handleDelete(friend.id)}>刪除好友</Button>
                                </Box>
                            </Flex>
                        </Box>
                    ))
                ) : (
                    <Flex alignItems="center" justifyContent="center" h="100%">
                        <Box textAlign="center">
                            <Text fontWeight="bold">目前沒有好友。</Text>
                            <Text>請使用上方的搜尋框來尋找並添加好友~</Text>
                        </Box>
                    </Flex>
                )}
                {isSearchVisible && (
                    <Box position="absolute" top="60px" left="0" right="0" bg="white" borderRadius="10px" shadow="md" zIndex="10">
                        <VStack spacing={4} align="stretch" mt={4} p={4}>
                            {searchRes.length > 0 ? (
                                searchRes.map((user) => (
                                    <Box key={user.id} p={4} borderBottomWidth="1px">
                                        <Flex justifyContent="space-around" alignItems="center">
                                            <Avatar size="md" src={user.profilePicture} alt={user.username} />
                                            <Box>
                                                <Text textAlign="left">名稱: {user.username}</Text>
                                                <Text textAlign="left">信箱: {user.email}</Text>
                                            </Box>
                                            {user.isFriend ? (
                                                <Button disabled>已經是好友</Button>
                                            ) : (
                                                <Button onClick={() => handleAddFriend(user.id)} colorScheme="teal">新增好友</Button>
                                            )}
                                        </Flex>
                                    </Box>
                                ))
                            ) : (
                                <Box textAlign="center">
                                    <Text fontWeight="bold">查無此人。</Text>
                                </Box>
                            )}
                            <Button onClick={handleCloseSearch} mt={4} colorScheme="red">取消</Button>
                        </VStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
};

export default Friend;
