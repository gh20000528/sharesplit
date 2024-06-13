import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import react from 'react';

const Group = () => {
    return (
        <VStack spacing={4} align="stretch">
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
                <Heading fontSize="xl">最近的活動 2</Heading>
                <Text mt={2}>日期: 2024-06-09</Text>
                <Text mt={2}>總金額: $150</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
                <Heading fontSize="xl">最近的活動 2</Heading>
                <Text mt={2}>日期: 2024-06-09</Text>
                <Text mt={2}>總金額: $150</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
                <Heading fontSize="xl">最近的活動 2</Heading>
                <Text mt={2}>日期: 2024-06-09</Text>
                <Text mt={2}>總金額: $150</Text>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
                <Heading fontSize="xl">最近的活動 2</Heading>
                <Text mt={2}>日期: 2024-06-09</Text>
                <Text mt={2}>總金額: $150</Text>
            </Box>
        </VStack>     
    )
}

export default Group