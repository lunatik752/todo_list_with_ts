import {todoListsApi, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";


type ActionType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
| SetTodoListsActionType


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    todoList: TodoListType

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

const initialState: Array<TodoListDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}


export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: 'all'}, ...state]
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
            return state
    }
}


export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}

export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
}


export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todoListId
    }
}

export const addTodoListAC = (todoList: TodoListType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList}
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


// Thunk

export const fetchTodoListsTC = () => {
   return (dispatch: Dispatch) => {
       dispatch(setAppStatusAC("loading"))
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodoListAC(todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodoListTitleTC = (newTitle: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.updateTodoList(todoListId, newTitle)
            .then((res) => {
                dispatch(changeTodoListTitleAC(newTitle, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}