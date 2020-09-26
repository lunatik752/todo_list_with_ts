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

//     (state: InitialAppReducerStateType = initialState, action: ActionsType): InitialAppReducerStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR': {
//             return {...state, error: action.error}
//         }
//         case "APP/SET-IS-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }



export const {setAppStatusAC} = slice.actions

export const {setAppErrorAC} = slice.actions

export const {setInitializeAppAC} = slice.actions


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {

        }
        dispatch(setInitializeAppAC({isInitialized: true}))
    })
}
