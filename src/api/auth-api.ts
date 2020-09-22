import axios from 'axios'

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type AuthResponseDataType = {
    id: number
    email: string
    login: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
})

export const authAPI = {
    me() {
         return   instance.get<ResponseType<AuthResponseDataType>>(`me`)
    }
} 