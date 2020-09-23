import { Dispatch } from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../state/app-reducer";
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import { authAPI } from '../../api/auth-api';

const initialState: InitialAuthReducerStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialAuthReducerStateType = initialState, action: ActionsType): InitialAuthReducerStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
export type InitialAuthReducerStateType = {
    isLoggedIn: boolean
}
