import {setAppError, setAppStatus} from "../components/app/app-reducer";
import {ResponseType} from "../api/types";
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = <T>(data: ResponseType<T>, thunkAPI: ThunkAPIType,
                                        showError = true) => {
    if (data.messages.length) {
        thunkAPI.dispatch(setAppError({error: data.messages[0]}))
    } else {
        thunkAPI.dispatch(setAppError({error:'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError,
                                         thunkAPI: ThunkAPIType,
                                         showError = true) => {
    thunkAPI.dispatch(setAppError(error.message ? {error: error.message} : {error:'Some error occurred'}))
    thunkAPI.dispatch(setAppStatus({status:'failed'}))
}


