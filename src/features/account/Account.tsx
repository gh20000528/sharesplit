import { Box, Spinner, Text, Avatar, Flex, IconButton, Button } from "@chakra-ui/react";
import { useParams } from "react-router";
import { AddIcon } from "@chakra-ui/icons";
import { useAccountList } from "./services/queries";

const Account = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const { data, error, isLoading } = useAccountList(groupId || '');

    if (isLoading) return <Spinner />;
    if (error) return <Text>錯誤: {error.message}</Text>;

    return (
        <Box>
            {data && data.map((transaction: any) => (
                <Box key={transaction.id} p={3} borderBottom="1px solid #ccc" mb={4}>
                    <Flex alignItems="center" mb={2}>
                        {transaction.createBy && (
                            <Avatar src={transaction.createBy.profilePicture} size="sm" />
                        )}
                        <Box ml={3}>
                            <Text fontWeight="bold">{transaction.title}</Text>
                            <Text fontSize="sm">{new Date(transaction.createdAt).toLocaleString()}</Text>
                            <Text fontSize="sm">支付: {transaction.createBy.username}</Text>
                        </Box>
                        <Box ml="auto">
                            <Text color="green.500" fontWeight="bold" pb={3}>${transaction.price}</Text>
                            {transaction.joiUser.map((user: any, index: number) => (
                            <Avatar key={index} src={user.profilePicture} size="xs" ml={-2} />
                        ))}
                        </Box>
                    </Flex>
                </Box>
            ))}
        </Box>
    );
};

export default Account;
