import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
}
export const todoListAPI = {
    updateTodoList(todolistId: string, title: string) {
        const promise =
            axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title}, settings)
        return promise
    }
}