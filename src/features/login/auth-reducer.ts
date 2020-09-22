import { Dispatch } from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../state/app-reducer";

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
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
export type InitialAuthReducerStateType = {
    isLoggedIn: boolean
}
