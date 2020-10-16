import {Dispatch} from 'redux';
import {setAppError, setAppStatus} from "../components/app/app-reducer";
import {ResponseType} from "../api/todoLists-api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error:'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? {error: error.message} : {error:'Some error occurred'}))
    dispatch(setAppStatus({status:'failed'}))
}


