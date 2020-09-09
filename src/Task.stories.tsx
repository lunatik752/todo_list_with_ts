import React from "react";
import {Task} from "./Task";
import {TaskType} from "./Todolist";
import {v1} from "uuid";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Task Stories',
    component: Task
}

const task: Array<TaskType> = [{
    id: v1(),
    isDone: true,
    title: 'CSS'
},
    {
        id: v1(),
        isDone: false,
        title: 'HTML'
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
