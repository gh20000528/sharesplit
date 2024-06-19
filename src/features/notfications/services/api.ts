import axios from 'axios';
import { FriendReq } from '../types/friend';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3003/api/notif'

export const getNotif = async () => {
    const token = Cookies.get('session')
    
    const res = await axios.get(`${API_URL}/notifications`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data
}

