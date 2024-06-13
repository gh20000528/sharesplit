import { Box, Button, Flex, Heading, Text, Avatar, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useUserProfile } from '../signin/services/queries';
import Group from '../group';
import Header from '../../component/header';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';



const AddGroupModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>新增群組</ModalHeader>
                <ModalCloseButton />
                <ModalBody padding={'10px'}>
                    <Input
                        padding={'10px'}
                        variant="flushed"
                        placeholder="name"
                        type="name"
                    />

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
        return <div>loading ...</div>;
    }

    const navigateToFriend = () => {
        navigate(`/friend/${data.id}`)
    }

    return (
        <Box>
            <Header/>
            <Box p={8}>
                <AddGroupModal isOpen={isModalOpen} onClose={closeModal}/>
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
