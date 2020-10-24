import {GetTasksResponseType, ResponseType, TaskType, UpdateModelTaskType} from "./types";
import {instance} from "./instance";


export const tasksAPI = {
    getTasks(todoListId: string) {
        const promise =
            instance.get<GetTasksResponseType>(`${todoListId}/tasks`)
        return promise
    },
    createTask(todoListId: string, title: string) {
        const promise =
            instance.post<ResponseType<{ item: TaskType }>>(`${todoListId}/tasks`, {title})
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise =
            instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`)
        return promise
    },

    updateTask(todolistId: string, taskId: string, modelTask: UpdateModelTaskType) {
        const promise =
            instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, modelTask)
        return promise
    }
}
