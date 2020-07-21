import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists/",
    withCredentials: true,
    headers: {"API-KEY": "90bf912e-ca5a-4b96-9037-858f400fe7a5"}
})


type CommonApiType<T> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export const authAPI = {
    me() {
        return instance.get<CommonApiType<{}>>(' auth/me')
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha= null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}
