import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {authAPI} from "../api/auth-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const initialState: InitialAppReducerStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: RequestErrorType }>) {
            state.error = action.payload.error
        },
        setInitializeAppAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})


export const appReducer = slice.reducer;



export const {setAppStatusAC, setAppErrorAC, setInitializeAppAC} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }
        dispatch(setInitializeAppAC({isInitialized: true}))
    })
}
