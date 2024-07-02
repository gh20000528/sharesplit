import { Avatar, Box, Button, Checkbox, effect, Flex, FormControl, FormLabel, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from "@chakra-ui/react";
import Header from "../../component/header";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { useGroupInfo } from "./services/mutations";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import Account from "../account";
import { useAddAccount } from "../account/services/mutations";
import { useAccountList } from "../account/services/queries";


interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: { id: number, username: string, profilePicture: string }[];
    groupId: string;
}

interface GroupInfo {
    groupName: string;
    groupSize: number;
    users: []
}


const AddExpenseModal = ({ isOpen, onClose, users, groupId }: AddExpenseModalProps) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<string>('');
    const [createBy, setCreateBy] = useState<number | null>(null);
    const [joinUser, setJoinUser] = useState<number[]>([]);
    const { mutateAsync: addAccount } = useAddAccount();
    

    const handleSave = async () => {
        const expenseData = {
            title,
            price: parseFloat(price),
            createBy: createBy?.toString(),
            joinUser,
            groupId: Number(groupId)
        };

        await addAccount(expenseData);
        onClose();
    }

    const toggleBeneficiary = (userId: any) => {
        if (joinUser.includes(userId)) {
            setJoinUser(joinUser.filter(id => id !== userId));
        } else {
            setJoinUser([...joinUser, userId]);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>新增支出</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>商品</FormLabel>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="買了什麼 ~" />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>價錢</FormLabel>
                        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="價錢" />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>付款人</FormLabel>
                        {users.map(user => (
                            <Flex key={user.id} alignItems="center" mb={2}>
                                <Avatar size="sm" src={user.profilePicture} />
                                <Text ml={2}>{user.username}</Text>
                                <Checkbox
                                    ml="auto"
                                    isChecked={createBy === user.id}
                                    onChange={() => setCreateBy(user.id)}
                                />
                            </Flex>
                        ))}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>替誰付錢</FormLabel>
                        {users.map(user => (
                            <Flex key={user.id} alignItems="center" mb={2}>
                                <Avatar size="sm" src={user.profilePicture} />
                                <Text ml={2}>{user.username}</Text>
                                <Checkbox
                                    ml="auto"
                                    isChecked={joinUser.includes(user.id)}
                                    onChange={() => toggleBeneficiary(user.id)}
                                />
                            </Flex>
                        ))}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSave}>
                        保存
                    </Button>
                    <Button variant="ghost" onClick={onClose}>取消</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

const GroupInfo = () => {
    const { mutateAsync: getGroupInfo } = useGroupInfo();
    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null)
    const [totalAccount, setTotalAccount] = useState(0);
    const { groupId } = useParams()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, error, isLoading } = useAccountList(groupId || '');

    // fetch group data
    useEffect(() => {
        const groupInfo = async () => {
            const data = await getGroupInfo(Number(groupId))
            setGroupInfo(data.data)
        }
        
        if (groupId) {
            groupInfo();
        }
    },[groupId, getGroupInfo])
        
    const accountData = data.map((item: any) => ({
        ...item,
        accountData: item
    }))

    // update total account
    useEffect(() => {
        const total = accountData.reduce((total: any, item: any) => total + item.accountData.price, 0);
        setTotalAccount(total);
    },[data])

    if (!groupInfo || !data) {
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
                        <Text pt={5}>交易: {accountData.length}</Text>
                        <Text py={3}>成員: {groupInfo.groupSize}</Text>
                        <Text>總支出: {totalAccount}</Text>
                    </Box>
                </Flex>
            </Box>
            <Box px={5}>
                <Box shadow="md" borderWidth="1px" borderRadius="10px" height="600px" p={3}>
                    <Tabs isFitted >
                        <TabList>
                            <Tab>總覽</Tab>
                            <Tab>每筆帳務清單</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box>
                                {groupInfo.users && groupInfo.users.length > 0 ? (
                                        groupInfo.users.map((user: any) => (
                                            <Box key={user.id} p={4} borderBottomWidth="1px">
                                                <Flex justifyContent="start" alignItems="center">
                                                    <Avatar size="md" src={user.profilePicture} />
                                                    <Box ml={5} textAlign="left">
                                                        <Text textAlign="left" as='b'>{user.username}</Text>
                                                        <Text fontSize="sm">支付:</Text>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        ))
                                    ) : (
                                        <Text>沒有成員信息</Text>
                                    )}
                                 </Box>
                            </TabPanel>
                            <TabPanel>
                                <Account data={data || []}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
            <Button position="fixed" right="25px" bottom="10px" colorScheme="teal"onClick={onOpen}><AddIcon /> <Text pl={5}>新增交易</Text></Button>
            <AddExpenseModal isOpen={isOpen} onClose={onClose} users={groupInfo.users} groupId={groupId || ''}/>
        </Box>
    );
};

export default GroupInfo;
