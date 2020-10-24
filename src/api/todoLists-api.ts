import {ResponseType, TodoListType} from "./types";
import {instance} from "./instance";


export const todoListsApi = {
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title: title})
    },
    getTodoLists() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    }
}
