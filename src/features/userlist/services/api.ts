import axios from 'axios';

const API_URL = 'http://localhost:3003/api'

export const userList = async () => {
    const res = await axios.get(`${API_URL}/user/userlist`)
    return res.data
}