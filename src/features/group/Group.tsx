import { Box, Heading, VStack, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import { useGroupList } from './services/queries';
import { Link, NavLink } from 'react-router-dom';

const Group = () => {
    const {data, isLoading} = useGroupList()

    console.log(data);
    

    if (isLoading) {
        return <div>Loading ...</div>
    }
    return (
        <Box shadow="md" borderWidth="1px" borderRadius="10px" height="600px" p="10px" position="relative">
            <VStack spacing={4} align="stretch">
                {
                    data.map((group: any) => (
                        <Box key={group.id} p={5} textAlign="left" borderBottomWidth="1px">
                            <NavLink to={`/group/${group.groupId}`}>
                                <Heading fontSize="xl">{group.group.name}</Heading>
                                <Text mt={2}>加入時間: {moment(group.joinAt).format('YYYY-MM-DD')}</Text>
                                <Text mt={2}>總金額: $150</Text>
                            </NavLink>
                        </Box>
                    ))
                }
            </VStack>     
        </Box>
    )
}

export default Group