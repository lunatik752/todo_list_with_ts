export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = null | string


export type InitialAppReducerStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: RequestErrorType
}

const initialState: InitialAppReducerStateType = {
    status: 'idle',
    error: null
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

type ActionsType = SetAppStatusActionType | SetAppErrorActionType

export type SetAppStatusActionType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}

export const setAppStatusAC = (status: RequestStatusType): SetAppStatusActionType =>  {
    return {type: "APP/SET-STATUS", status}}

export type SetAppErrorActionType = {
    type: 'APP/SET-ERROR'
    error: RequestErrorType
}

export const setAppErrorAC = (error: RequestErrorType): SetAppErrorActionType =>  {
    return {type: 'APP/SET-ERROR', error}}