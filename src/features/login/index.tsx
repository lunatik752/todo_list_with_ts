import * as authSelectors from './selectors'
import { Login } from './Login'
import {asyncActions as authAsyncActions, slice} from  './auth-reducer'

const authActions = {
    ...authAsyncActions,
    ...slice.actions
}

export {
    authSelectors,
    authActions,
    Login
}

