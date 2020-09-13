import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
})

export const todoListAPI = {
    updateTodoList(todolistId: string, title: string) {
        const promise =
            instance.put(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTodoLists() {
        const promise =
            instance.get('/todo-lists')
        return promise
    },
    createTodoList(title: string) {
        const promise =
            instance.post('todo-lists', {title: title})
        return promise
    },
    deleteTodoList(todoListId: string) {
        const promise =
            instance.delete(`todo-lists/${todoListId}`)
        return promise
    }
}