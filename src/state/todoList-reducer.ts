import {todoListsApi, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksAPI} from "../api/tasks-api";



export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoLists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await todoListsApi.getTodoLists();
        dispatch(setAppStatusAC({status: 'succeeded'}));
        return {todoLists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({})
    }
})


const slice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
      /*  setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            return  action.payload.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'succeeded'
            }))
        },*/
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ newTitle: string, todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].title = action.payload.newTitle;
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ newFilter: FilterValuesType, todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].filter = action.payload.newFilter;
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].entityStatus = action.payload.entityStatus;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled, (state,action) => {
              action.payload.todoLists.map(tl => ({
                tl,
                filter: 'all',
                entityStatus: 'succeeded'
            }))
        })
    }
})

export const { removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions

export const todoListReducer = slice.reducer



// Thunk



export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodoListEntityStatusAC({todoListId: todoListId, entityStatus: 'loading'}))
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC({todoListId: todoListId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const changeTodoListTitleTC = (newTitle: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsApi.updateTodoList(todoListId, newTitle)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodoListTitleAC({newTitle: newTitle, todoListId: todoListId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoListsApi.createTodoList(title)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTodoListAC({todoList: res.data.data.item}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
