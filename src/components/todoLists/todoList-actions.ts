import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../app/app-reducer";
import {todoListsApi} from "../../api/todoLists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {changeTodoListEntityStatusAC} from "./todoList-reducer";

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
