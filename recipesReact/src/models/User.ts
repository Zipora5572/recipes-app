import { createContext, Dispatch } from "react"

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phoneNumber: string
}

type PartialWithRequiredFields<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type Action = {
    type: 'REGISTER',
    data: Partial<UserType>
} | {
    type: 'LOGIN'
    data: Partial<UserType>
} | {
    type: 'LOG_OUT'

} | {
    type: 'GET_USER'

} | {
    type: 'UPDATE',
    data: PartialWithRequiredFields<UserType, 'email' | 'password'>;
}


export const initialState: UserType = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
}

export const UserContext = createContext<{
    user: UserType;
    userDispatch: Dispatch<Action>;
}>({
    user: initialState,
    userDispatch: () => null
});



export default (state: UserType, action: Action): UserType => {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                ...action.data, 
            };
        case 'LOGIN':
            return {
                ...state,
                ...action.data 
            };
        case 'LOG_OUT':
            return initialState;
        case 'UPDATE':
            return {
                ...state,
                ...action.data 
            };
        default:
            return state;
    }
}
