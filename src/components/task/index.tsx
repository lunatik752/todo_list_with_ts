import * as tasksSelectors from './selectors'
import {asyncActions as tasksAsyncActions, slice} from './tasks-reducer'

const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    tasksSelectors
}
