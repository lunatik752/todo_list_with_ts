import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {ResponseType} from "../api/todoLists-api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message ? {error: error.message} : {error:'Some error occurred'}))
    dispatch(setAppStatusAC({status:'failed'}))
}


