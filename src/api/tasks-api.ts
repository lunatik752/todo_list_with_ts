import {GetTasksResponseType, ResponseType, TaskType, UpdateModelTaskType} from "./types";
import {instance} from "./instance";


export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, modelTask: UpdateModelTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, modelTask)
    }
}
