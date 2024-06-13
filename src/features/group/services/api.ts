import axios from 'axios';
import { addGroupReq, editGroupReq } from '../types/group';
import App from '../../../App';

const API_URL = 'http://localhost:3003/api/group'

export const getGroupList = async () => {
    const res = await axios.get(`${API_URL}/grouplist`)
    return res.data
}

export const addGroup = async ({name, userId}: addGroupReq) => {
    const res = await axios.post(`${API_URL}/addgroup`, {name, userId})
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