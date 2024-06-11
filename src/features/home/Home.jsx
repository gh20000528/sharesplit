import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserProfile } from '../signin/services/queries';
import Cookies from 'js-cookie';

const Home = () => {
    const {data, isLoading, error} = useUserProfile()
    if (isLoading) {
        return (
            <div>loading ...</div>
        )
    }
    console.log(data);
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to home page</p>
            <p>{data.username}</p>
        </div>
    )
}

export default Home;