import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

// export const REMOVE_TODOLIST = 'todoList/reducer/REMOVE-TODOLIST'
// export const ADD_TODOLIST = 'todoList/reducer/ADD-TODOLIST'
// export const CHANGE_TODOLIST_TITLE = 'todoList/reducer/CHANGE-TODOLIST-TITLE'
// export const CHANGE_TODOLIST_FILTER = 'todoList/reducer/CHANGE-TODOLIST-FILTER'


type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
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



export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
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
            throw new Error("I don't understand this type")
    }
}

