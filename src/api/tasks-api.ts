import axios from 'axios'

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1//todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '90bf912e-ca5a-4b96-9037-858f400fe7a5'
    }
})

export const tasksAPI = {
    getTasks(todoListId: string) {
        const promise =
            instance.get<Array<TaskType>>(`${todoListId}/tasks`)
        return promise
    },
    createTask(todoListId: string, title: string) {
        const promise =
            instance.post(`${todoListId}/tasks`, {title: title})
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise =
            instance.delete(`${todoListId}/tasks/${taskId}`)
        return promise
    }
    // updateTodoList(todolistId: string, title: string) {
    //     const promise =
    //         instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    //     return promise
    // },
    //
    //
}