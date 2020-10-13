import {setIsLoggedInAC} from "../../features/login/auth-reducer";
import {authAPI} from "../../api/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const initializeAppTC = createAsyncThunk('auth/app', async (param, {dispatch}) => {
    const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
})


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialAppReducerStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: RequestErrorType }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: (builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    })
})

export const appReducer = slice.reducer;

export const {setAppStatusAC, setAppErrorAC} = slice.actions

