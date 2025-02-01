import axios from 'axios';
import { UserType } from '../models/User';

const API_URL = 'http://localhost:3000/api/user';

export const signUp = async (user: Partial<UserType>) => {
    try {
        const res = await axios.post(`${API_URL}/register`,
            {
                email: user.email,
                password: user.password
            },
        )
        console.log(res.data);
        
        return res.data;

       
    } catch (e) {
        console.log(e);
        if (e.status === 422)
            alert('user already sign up')
    }
}

export const login = async (user:Partial<UserType>) => {
    try {
        const res = await axios.post(`${API_URL}/login`,
            user,
        )
        console.log(res.data);
        
        return res.data;
     
    } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            alert('user not found')
        }
    }
}


export const update= async (user: Partial<UserType>) => {
    try {
        const res = await axios.put(`${API_URL}`,
            user,
         { headers: {'user-id':user.id} }
        )
        
        return res.data;
    } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            alert('user not found')
        }
    }
}
