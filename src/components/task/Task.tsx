import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../common/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import {TaskStatuses, TaskType} from "../../api/tasks-api";


type PropsTaskType = {
    task: TaskType,
    removeTask: (id: string, todoListId: string) => void,
    changeStatus: (id: string, status: TaskStatuses, todoListId: string) => void,
    todoListId: string,
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
}

export const Task = React.memo(function (props: PropsTaskType) {

        console.log("Task called")

    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }
    const onChangeTitleHandler = useCallback((newtTitle: string) => {
        props.changeTaskTitle(props.task.id, newtTitle, props.todoListId)
    }, [props])


        return <div key={props.task.id}
                    className={props.task.status === TaskStatuses.Completed? 'isDone' : ''}>
            <Checkbox color={"primary"}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    }
)