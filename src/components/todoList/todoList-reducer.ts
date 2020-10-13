import {todoListsApi, TodoListType} from "../../api/todoLists-api";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


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

export const removeTodoListTC = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({todoListId: todoListId, entityStatus: 'loading'}))
    try {
        const res = await todoListsApi.deleteTodoList(todoListId);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoListId: todoListId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


export const changeTodoListTitleTC = createAsyncThunk('todoLists/changeTodoListTitle', async (params: { newTitle: string, todoListId: string }, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsApi.updateTodoList(params.todoListId, params.newTitle);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {newTitle: params.newTitle, todoListId: params.todoListId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

export const addTodoListTC = createAsyncThunk('todoLists/addTodoList', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await todoListsApi.createTodoList(title);
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoList: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'todoList',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
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
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
            return action.payload.todoLists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }))
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(changeTodoListTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].title = action.payload.newTitle;
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        })
    }
})

export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions

export const todoListReducer = slice.reducer



