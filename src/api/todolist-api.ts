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
    },
    getTodoLists() {
        const promise =
            axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodoList(title: string) {
        const promise =
            axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodoList(todoListId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
        return promise
    }
}