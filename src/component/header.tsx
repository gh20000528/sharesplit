import { Badge, Box, Flex, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import react, { useState } from 'react';

import Notif from '../features/notfications';



const Header = () => {
    return(
        <Box bg="teal.500" p={6}>
            <Flex alignItems="center" justifyContent="space-between">
                <Heading fontSize={24} color="white">ShareSplit</Heading>
                <Notif/>
            </Flex>
        </Box>
    )
}


export default Header;