import {todoListsApi, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";
import {
    setAppErrorAC,
    setAppStatusAC,
    SetAppStatusActionType,
    SetAppErrorActionType,
    RequestStatusType
} from "./app-reducer";


type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListsActionType
    | ChangeTodoListEntityStatusActionType


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

export type ChangeTodoListEntityStatusActionType = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    todoListId: string
    entityStatus: RequestStatusType
}

const initialState: Array<TodoListDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


export const todoListReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'succeeded'
            }))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todoList, filter: 'all', entityStatus: 'succeeded'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
          return  state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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

export const changeTodoListEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType): ChangeTodoListEntityStatusActionType => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        todoListId,
        entityStatus
    }
}


// Thunk

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(changeTodoListEntityStatusAC(todoListId,"loading"))
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodoListAC(todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodoListTitleTC = (newTitle: string, todoListId: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.updateTodoList(todoListId, newTitle)
            .then((res) => {
                dispatch(changeTodoListTitleAC(newTitle, todoListId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC("loading"))
        todoListsApi.createTodoList(title)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTodoListAC(res.data.data.item))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        if (res.data.messages.length) {
                            dispatch(setAppErrorAC(res.data.messages[0]))
                        } else {
                            dispatch(setAppErrorAC('Some error occurred'))
                        }
                        dispatch(setAppStatusAC('failed'))
                    }
                }
            )
    }
}