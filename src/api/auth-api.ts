import axios from 'axios'
import {AuthResponseDataType, LoginParamsType, ResponseType} from "./types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
})

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthResponseDataType>>(`auth/me`)
    },
    login(data: LoginParamsType) {
return instance.post<ResponseType<{ userId?: number }>>( '/auth/login', data)
    },
    logout() {
        debugger
        return instance.delete<ResponseType>('/auth/login')
    }
}
