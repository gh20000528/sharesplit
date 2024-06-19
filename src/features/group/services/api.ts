import axios from 'axios';
import { addGroupReq, editGroupReq } from '../types/group';
import App from '../../../App';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3003/api/group'

export const getGroupList = async () => {
    const  token = Cookies.get('session')

    const res = await axios.get(`${API_URL}/grouplist`,{
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data
}

export const addGroup = async ({name, userId, invitedFriends}: addGroupReq) => {
    console.log(invitedFriends);
    const res = await axios.post(`${API_URL}/addgroup`, {name, userId, invitedFriends})
    return res.data
}

export const editGroup = async ({id, newName}: editGroupReq) => {
    const res = await axios.post(`${API_URL}/editgroup`, {id, newName})
    return res.data
}

export const softGroup = async (id: string) => {
    const res = await axios.post(`${API_URL}/softgroup`, id)
    return res.data
}