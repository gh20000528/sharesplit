import axios from 'axios';



const API_URL = 'http://localhost:3003/api/group'

export const getGroupInfo = async (groupId: number) => {
    const res = await axios.post(`${API_URL}/groupJoinUser`, {groupId})
    return res.data
}

