import React from "react";
import {Task} from "../components/task/Task";
import {v1} from "uuid";
import {Meta} from "@storybook/react/types-6-0";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {TaskDomainType} from "../components/task/tasks-reducer";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Example/Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const task: Array<TaskDomainType> = [{
    id: v1(),
    status: TaskStatuses.New,
    title: 'CSS',
    todoListId: "todoListId1",
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.Hi,
    startDate: '',
    entityTaskStatus: 'idle'
},
    {
        id: v1(),
        title: 'HTML',
        status: TaskStatuses.Completed,
        todoListId: "todoListId1",
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Hi,
        startDate: '',
        entityTaskStatus: 'idle'
    }
]

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task task={task[0]}
                  todoListId={'todoListId1'}/>
            <Task task={task[1]}
                  todoListId={'todoListId1'}/>
        </div>
    )
}

