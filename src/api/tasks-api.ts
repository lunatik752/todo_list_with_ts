import {GetTasksResponseType, ResponseType, TaskType, UpdateModelTaskType} from "./types";
import {instance} from "./instance";


export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todoListId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, modelTask: UpdateModelTaskType) {
        return instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, modelTask)
    }
}
