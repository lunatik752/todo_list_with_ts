import {todoListsApi} from "../../api/todoLists-api";
import {RequestStatusType} from "../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {TodoListType} from "../../api/types";
import {ThunkError} from "../../utils/types";
import { appActions } from "../../features/CommonActions/App";

const {setAppStatus} = appActions

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

 const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoLists', async (param, thunkAPI) => {
     thunkAPI.dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await todoListsApi.getTodoLists();
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}));
        return {todoLists: res.data}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue({})
    }
})

 const removeTodoListTC = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, thunkAPI) => {
     thunkAPI.dispatch(setAppStatus({status: "loading"}))
     thunkAPI.dispatch(changeTodoListEntityStatus({todoListId: todoListId, entityStatus: 'loading'}))
    try {
        const res = await todoListsApi.deleteTodoList(todoListId);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoListId: todoListId}
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue(null)
    }
})

 const changeTodoListTitleTC = createAsyncThunk('todoLists/changeTodoListTitle', async (params: { newTitle: string, todoListId: string }, thunkAPI) => {
     thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todoListsApi.updateTodoList(params.todoListId, params.newTitle);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {newTitle: params.newTitle, todoListId: params.todoListId}
        } else {
            handleServerAppError(res.data, thunkAPI)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI)
        return thunkAPI.rejectWithValue(null)
    }
})

 const addTodoListTC = createAsyncThunk<{ todoList: TodoListType }, string, ThunkError>('todoLists/addTodoList', async (title: string, thunkAPI ): Promise<any> => {
     thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todoListsApi.createTodoList(title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todoList: res.data.data.item}
        } else {
             handleServerAppError(res.data, thunkAPI, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
       return  handleServerNetworkError(error, thunkAPI, false)
    }
})

export const asyncActions = {
    fetchTodoListsTC,
    removeTodoListTC,
    changeTodoListTitleTC,
    addTodoListTC
}

export  const slice = createSlice({
    name: 'todoLists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ newFilter: FilterValuesType, todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId);
            state[index].filter = action.payload.newFilter;
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
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

export const {changeTodoListFilter, changeTodoListEntityStatus} = slice.actions




