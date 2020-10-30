import * as appSelectors from './selectors'
import {asyncActions as appAsyncActions, slice, RequestStatusType as T1} from "./app-reducer";


const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...appAsyncActions,
    ...actions
}

export type RequestStatusType = T1

export {
    appSelectors,
    appActions,
    appReducer
}
