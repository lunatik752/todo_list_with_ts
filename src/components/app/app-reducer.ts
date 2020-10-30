import {authAPI} from "../../api/auth-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authActions} from "../../features/login";
import { appActions } from "../../features/CommonActions/App";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string


export type InitialAppReducerStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // сюда будет записан текст ошибки - если произойдет какая-то глобальлная ошибка
    error: RequestErrorType
    //isInitialized === true когда приложение проиницилизировалось
    isInitialized: boolean
}

const initializeApp = createAsyncThunk('auth/app', async (param, {dispatch}) => {
    const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({value: true}));
        } else {
        }
})

export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialAppReducerStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state,action) => {
            state.isInitialized = true
        })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const asyncActions = {
    initializeApp
}





