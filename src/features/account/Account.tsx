import { Box, Spinner, Text, Avatar, Flex, IconButton, Button } from "@chakra-ui/react";
import { useParams } from "react-router";
import { AddIcon } from "@chakra-ui/icons";
import { useAccountList } from "./services/queries";

const Account = ({ data }: any) => {
    if (!Array.isArray(data)) {
        return <Text>沒有交易</Text>;
    }

    return (
        <Box>
            {data.length > 0 ? (
                data.map((transaction) => (
                    <Box key={transaction.id} p={3} borderBottom="1px solid #ccc" mb={4}>
                        <Flex alignItems="center" mb={2}>
                            {transaction.createBy && transaction.createBy.profilePicture && (
                                <Avatar src={transaction.createBy.profilePicture} size="sm" />
                            )}
                            <Box ml={3}>
                                <Text fontWeight="bold">{transaction.title}</Text>
                                <Text fontSize="sm">{new Date(transaction.createdAt).toLocaleString()}</Text>
                                {transaction.createBy && transaction.createBy.username && (
                                    <Text fontSize="sm">支付: {transaction.createBy.username}</Text>
                                )}
                            </Box>
                            <Box ml="auto">
                                <Text color="green.500" fontWeight="bold" pb={3}>${transaction.price}</Text>
                                {transaction.joiUser && transaction.joiUser.length > 0 && transaction.joiUser.map((user: any, index: any) => (
                                    user && user.profilePicture && (
                                        <Avatar key={index} src={user.profilePicture} size="xs" ml={-2} />
                                    )
                                ))}
                            </Box>
                        </Flex>
                    </Box>
                ))
            ) : (
                <Text>沒有交易</Text>
            )}
        </Box>
    );
};
export default Account;
