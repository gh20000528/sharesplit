import { Box, Button, Flex, Heading, Text, Avatar, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, SelectField, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useUserProfile } from '../signin/services/queries';
import Group from '../group';
import Header from '../../component/header';
import Select from 'react-select'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAddGroup } from '../group/services/mutations';
import { useFriendList } from '../friend/services/queries';
import Loading from '../../component/Loading';


// modal from animation key
const shake = keyframes `
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
`
// 新增群組modal
const AddGroupModal = ({ isOpen, onClose, userId }) => {
    const [inputName, setInputName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [selectedFriend, setSelectedFried] = useState([])
    const { mutateAsync: addGroup } = useAddGroup()
    const {data, isLoading} = useFriendList()

    // reset 錯誤訊息
    const resetForm = () => {
        setInputName('');
        setSelectedFried([]);
        setErrorMessage('');
        setHasError(false);
    }
    
    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    },[isOpen])

    // 新增 api
    const handlerAddGroup = async () => {
        if (!inputName.trim()) {
            setErrorMessage('群組名稱不能是空的')
            setHasError(true)
            return
        }
        await addGroup({
            name: inputName, 
            userId,
            invitedFriends: selectedFriend.map(friend => friend.value)
        }) // input (name, userId, friendId)
        onClose()
    }

    if (isLoading) {
        return <div>loading ...</div>;
    }

    const friendOptions = data.map(friend => ({
        value: friend.id,
        label: friend.name
    }))

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>新增群組</ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={'10px'}>
                    <Input
                        my={5}
                        padding={'10px'}
                        placeholder="name"
                        type="name"
                        onChange={(e) => setInputName(e.target.value)}
                        borderColor={hasError ? 'red.500' : 'gray.500'}
                        css={hasError ? { animation: `${shake} 0.3s` } : {}}
                    />
                    {errorMessage && <Text color="red.500">{errorMessage}</Text>}
                    <Select 
                        isMulti
                        options={friendOptions}
                        placeholder='邀請好友'
                        value={selectedFriend}
                        onChange={setSelectedFried}
                        style={{ container: (base) => ({ ...base, marginTop: '10px' }) }}
                    />
                    <Flex justifyContent="end" p={5}>
                        <Button onClick={handlerAddGroup} colorScheme='teal' mr={3}>新增</Button>
                        <Button onClick={onClose} ml={3}>取消</Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}


const Home = () => {
    const { data, isLoading } = useUserProfile();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false);
    if (isLoading) {
        return <Loading/>;
    }

    return (
        <Box>
            <Header/>
            <Box p={8}>
                <AddGroupModal isOpen={isModalOpen} onClose={closeModal} userId={data.id}/>
                <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                    <GridItem colSpan={{ base: 12, md: 4 }}>
                        <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px" height="350px">
                            <Avatar size="2xl" src={data.profilePicture} alt={data.username} mb={4} objectFit="cover" />
                            <Heading fontSize="xl">{data.username}</Heading>
                            <Text mt={2}>{data.email}</Text>
                            <Text mt={2}>群組數量: 4</Text> {/* 假設群組數量是 4 */}
                        </Box>
                        <Flex mt={4} justifyContent="space-between">
                            <Button as={NavLink} colorScheme="teal" flex="1" mr={2} onClick={openModal}>新增群組</Button>
                            <Button as={NavLink} to={`friend/${data.id}`} colorScheme="teal" flex="1" mx={2}>好友列表</Button>
                            <Button as={NavLink} to="group" colorScheme="teal" flex="1" ml={2}>你的群組</Button>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 8 }}>
                        <Outlet/>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    );
};

export default Home;
