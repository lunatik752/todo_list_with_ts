import {createAction} from '@reduxjs/toolkit'
import {RequestErrorType, RequestStatusType} from "../../components/app/app-reducer";



const setAppStatus = createAction<{status: RequestStatusType}>('appActions/setAppStatus')
const setAppError = createAction<{error: RequestErrorType}>('appActions/setAppError')

export const appActions = {
    setAppStatus,
    setAppError
}
