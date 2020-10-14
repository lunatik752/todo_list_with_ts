import * as todoListsSelectors from './selectors'
import {asyncActions as todoListsAsyncActions, slice} from "./todoList-reducer";


const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

export {
    todoListsActions,
    todoListsSelectors
}

