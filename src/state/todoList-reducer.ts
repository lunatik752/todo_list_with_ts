
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithReducer";


type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}


export const todoListReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = [...state].find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todoList = [...state].find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I  don't understand this type")
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    }
}

export const addTodoListAC = (newTitle: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: newTitle,
        todoListId: v1()
    }
}

export const changeTodoListTitleAC = (newTitle: string, todoListId: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: newTitle,
        id: todoListId
    }
}

export const changeTodoListFilterAC = (newFilter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: newFilter,
        id: todoListId
    }
}
