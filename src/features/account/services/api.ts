import axios from 'axios';
import { addAccountreq } from '../types/account';


const API_URL = 'http://localhost:3003/api/account'

export const getAccountlist = async (groupId: string) => {
    const res = await axios.post(`${API_URL}/accountList`, {groupId})
    return res.data
}

export const addAccount = async (data: addAccountreq) => {
    const res = await axios.post(`${API_URL}/addaccount`, data)
    return res.data
}
