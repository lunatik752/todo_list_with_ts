import axios from 'axios'

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string
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
            instance.get<GetTasksResponseType>(`${todoListId}/tasks`)
        return promise
    },
    createTask(todoListId: string, title: string) {
        const promise =
            instance.post(`${todoListId}/tasks`, {title: title})
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise =
            instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`)
        return promise
    },

    updateTask(todolistId: string, taskId: string, modelTask: UpdateModelTaskType) {
        const promise =
            instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`,  modelTask)
        return promise
    }
}