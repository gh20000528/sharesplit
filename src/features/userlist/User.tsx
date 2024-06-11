import react from 'react';
import { useUserList } from './services/queries';

const User = () => {
    const { data, isLoading, error } = useUserList()
    console.log(data);
    

    return (
        <div>
            <h1>User</h1>

        </div>
    );
};

export default User;
