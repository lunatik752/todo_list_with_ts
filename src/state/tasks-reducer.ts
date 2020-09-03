import {TasksStateType} from "../App";



type ActionType = SomeActionType1 | SomeActionType2



export type SomeActionType1 = {
    type: '',
    id: string
}

export type SomeActionType2 = {
    type: '',
    id: string
}


export const todoListReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case'': {
            return state
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (taskId: string): SomeActionType1 => {
    return {
        type: '',
        id: taskId
    }
}

export const AddTodoListAC = (taskId: string): SomeActionType2 => {
    return {
        type: '',
        id: taskId
    }
}
