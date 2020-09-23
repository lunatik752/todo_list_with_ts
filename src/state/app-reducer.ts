import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {authAPI} from "../api/auth-api";
import {Dispatch} from "redux";

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

export const appReducer = (state: InitialAppReducerStateType = initialState, action: ActionsType): InitialAppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType



export const setAppStatusAC = (status: RequestStatusType) =>  {
    return {type: "APP/SET-STATUS", status} as const}


export const setAppErrorAC = (error: RequestErrorType) =>  {
    return {type: 'APP/SET-ERROR', error} as const}



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    })
}
