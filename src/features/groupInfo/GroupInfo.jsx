import { Avatar, Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Header from "../../component/header";
import { SearchIcon } from "@chakra-ui/icons";
import { useGroupInfo } from "./services/mutations";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


const GroupInfo = () => {
    const { mutateAsync: getGroupInfo } = useGroupInfo();
    const [groupInfo, setGroupInfo] = useState([])
    const { groupId } = useParams()

    useEffect(() => {
        const groupInfo = async () => {
            const data = await getGroupInfo(Number(groupId))
            setGroupInfo(data.data)
        }
        
        if (groupId) {
            groupInfo();
        }
    },[groupId, getGroupInfo])
    console.log(groupInfo);

    if (!groupInfo) {
        return <div>Loading...</div>; // 添加加载状态
    }

    return (
        <Box>
            <Header/>
            <Box w='100%' h="350px">
                <Flex justifyContent="center" alignItems="center" h="100%">
                    <Box mr={5}>圖表</Box>
                    <Box ml={5} textAlign="left">
                        <Text fontSize="3xl" p={5} as='b'>{groupInfo.groupName}</Text>
                        <Text>交易</Text>
                        <Text py={3}>成員: {groupInfo.groupSize}</Text>
                        <Text>總支出: $100</Text>
                    </Box>
                </Flex>
            </Box>
            <Box px={5}>
                <Flex pb={5}>
                    <Input
                        placeholder='搜尋消費 ...'
                        variant="flushed"
                        p={5}
                    />
                    <Button colorScheme="teal"><SearchIcon /></Button>
                </Flex>
                <Box shadow="md" borderWidth="1px" borderRadius="10px" height="600px" p="10px">
                    {groupInfo.users && groupInfo.users.length > 0 ? (
                        groupInfo.users.map((user) => (
                            <Box key={user.id} p={4} borderBottomWidth="1px">
                                <Flex justifyContent="start" alignItems="center">
                                    <Avatar size="md" src={user.profilePicture} alt={user.name} />
                                    <Box ml={5} textAlign="left">
                                        <Text textAlign="left" as='b'>{user.username}</Text>
                                        <Text fontSize="sm">支付:</Text>
                                    </Box>
                                    <Box>

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
                </Box>
            </Box>
        </Box>
    );
};

export default GroupInfo;
