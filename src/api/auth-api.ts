import {AuthResponseDataType, LoginParamsType, ResponseType} from "./types";
import {instance} from "./instance";

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthResponseDataType>>(`auth/me`)
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('/auth/login', data)
    },
    logout() {
        debugger
        return instance.delete<ResponseType>('/auth/login')
    }
}
