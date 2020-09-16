import axios from 'axios'

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
})

export const todoListsApi = {
    updateTodoList(todolistId: string, title: string) {
        const promise =
            instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTodoLists() {
        const promise =
            instance.get<Array<TodoListType>>('/todo-lists')
        return promise
    },
    createTodoList(title: string) {
        const promise =
            instance.post<ResponseType<{item: TodoListType }>>('todo-lists', {title: title})
        return promise
    },
    deleteTodoList(todoListId: string) {
        const promise =
            instance.delete<ResponseType>(`todo-lists/${todoListId}`)
        return promise
    }
}