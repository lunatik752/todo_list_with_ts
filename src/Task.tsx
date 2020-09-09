import React, {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import {TaskType} from "./Todolist";


type PropsTaskType = {
    task: TaskType,
    removeTask: (id: string, todoListId: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
    todoListId: string,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
}

export const Task = React.memo(function (props: PropsTaskType) {

        console.log("Task called")

    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue, props.todoListId)
    }
    const onChangeTitleHandler = (newtTitle: string) => {
        props.changeTaskTitle(props.task.id, newtTitle, props.todoListId)
    }


        return <div key={props.task.id}
                    className={props.task.isDone ? 'isDone' : ''}>
            <Checkbox color={"primary"}
                      checked={props.task.isDone}
                      onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    }
)