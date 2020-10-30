import * as todoListsSelectors from './selectors'
import {asyncActions as todoListsAsyncActions, slice as todoListsSlice} from "./todoList-reducer";


const todoListsActions = {
    ...todoListsAsyncActions,
    ...todoListsSlice.actions
}

const todoListsReducer  = todoListsSlice.reducer

export {
    todoListsActions,
    todoListsSelectors,
    todoListsReducer
}

