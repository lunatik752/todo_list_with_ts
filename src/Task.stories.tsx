import React from "react";
import {Task} from "./Task";
import {v1} from "uuid";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react/types-6-0";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/tasks-api";


export default {
    title: 'Example/Task Stories',
    component: Task
} as Meta

const task: Array<TaskType> = [{
    id: v1(),
    status: TaskStatuses.New,
    title: 'CSS',
    todoListId: "todoListId1",
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.Hi,
    startDate: ''
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
        startDate: ''
    }
]
const removeTaskCallback = action('Remove Button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task')


export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task task={task[0]} removeTask={removeTaskCallback} changeStatus={changeStatusCallback}
                  todoListId={'todoListId1'} changeTaskTitle={changeTaskTitleCallback}/>
            <Task task={task[1]} removeTask={removeTaskCallback} changeStatus={changeStatusCallback}
                  todoListId={'todoListId1'} changeTaskTitle={changeTaskTitleCallback}/>
        </div>
    )
}
