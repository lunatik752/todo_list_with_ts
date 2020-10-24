import {ResponseType, TodoListType} from "./types";
import {instance} from "./instance";


export const todoListsApi = {
    updateTodoList(todoListId: string, title: string) {
        const promise =
            instance.put<ResponseType>(`todo-lists/${todoListId}`, {title: title})
        return promise
    },
    getTodoLists() {
        const promise =
            instance.get<Array<TodoListType>>('/todo-lists')
        return promise
    },
    createTodoList(title: string) {
        const promise =
            instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
        return promise
    },
    deleteTodoList(todoListId: string) {
        const promise =
            instance.delete<ResponseType>(`todo-lists/${todoListId}`)
        return promise
    }
}
