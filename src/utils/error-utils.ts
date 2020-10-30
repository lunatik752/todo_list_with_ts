import {ResponseType} from "../api/types";
import {AxiosError} from "axios";
import {appActions} from "../features/CommonActions/App";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = <T>(data: ResponseType<T>, thunkAPI: ThunkAPIType,
                                        showError = true) => {
    if (data.messages.length) {
        thunkAPI.dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        thunkAPI.dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError,
                                         thunkAPI: ThunkAPIType,
                                         showError = true) => {
    thunkAPI.dispatch(appActions.setAppError(error.message ? {error: error.message} : {error: 'Some error occurred'}))
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))
}


