import * as tasksSelectors from './selectors'
import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './tasks-reducer'

const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const tasksReducer  = tasksSlice.reducer

export {
    tasksActions,
    tasksSelectors,
    tasksReducer
}
