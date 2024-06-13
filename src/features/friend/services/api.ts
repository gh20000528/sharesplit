import axios from 'axios';
import { FriendReq } from '../types/friend';


const API_URL = 'http://localhost:3003/api/friend'

export const getFriendlist = async (userId: string) => {
    const res = await axios.post(`${API_URL}/friendlist`, {userId})
    return res.data
}

export const addFriend = async ({userId, friendId}: FriendReq) => {
    const res = await axios.post(`${API_URL}/addfriend`, {userId, friendId})
    return res.data
}

export const deletedFriend = async ({userId, friendId}: FriendReq) => {
    const res = await axios.post(`${API_URL}/deletedfriend`, {userId, friendId})
    return res.data
}

export const searchUser = async (searchTerm: string) => {
    const res = await axios.get(`${API_URL}/searchUser`, {params: {q: searchTerm}})
    console.log(res.data);
    
    return res.data
}