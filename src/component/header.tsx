import { Box, Flex, Heading } from '@chakra-ui/react';
import react from 'react';

const Header = () => {
    
    return(
        <Box bg="teal.500" p={6}>
            <Flex alignItems="center">
                <Heading fontSize={24} color="white">ShareSplit</Heading>
            </Flex>
        </Box>
    )
}


export default Header;