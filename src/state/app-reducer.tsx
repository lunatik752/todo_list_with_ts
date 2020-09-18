export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
}

const initialState: InitialStateType = {
    status: 'loading',
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

type ActionsType = any

type SetAppStatusActionType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}

export const setAppStatusAC = (status: RequestStatusType): SetAppStatusActionType =>  {
    return {type: "APP/SET-STATUS", status}}