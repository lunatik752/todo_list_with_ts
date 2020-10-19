import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../common/EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import {TaskStatuses} from "../../api/tasks-api";
import {TaskDomainType} from "./tasks-reducer";
import {useActions} from "../../state/store";
import {tasksActions} from "./index";


type PropsTaskType = {
    task: TaskDomainType,
    todoListId: string,
}

export const Task = React.memo(function (props: PropsTaskType) {

        const {updateTask, removeTask} = useActions(tasksActions)


        const changeTaskStatus = useCallback(function (taskId: string, status: TaskStatuses, todoListId: string) {
            updateTask({taskId, domainModel: {status}, todoListId})
        }, [updateTask])

        const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todoListId: string) {
            updateTask({taskId, domainModel: {title: newTitle}, todoListId})
        }, [updateTask])

        const onClickHandler = () => removeTask({taskId: props.task.id, todoListId: props.todoListId})

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
        }
        const onChangeTitleHandler = useCallback((newtTitle: string) => {
            changeTaskTitle(props.task.id, newtTitle, props.todoListId)
        }, [changeTaskTitle, props.task.id, props.todoListId])

        const disabled = props.task.entityTaskStatus === 'loading'


        return <div key={props.task.id}
                    className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}>
            <Checkbox color={"primary"}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeStatusHandler} disabled={disabled}
            />
            <EditableSpan title={props.task.title} onChangeTitle={onChangeTitleHandler} disabled={disabled}/>
            <IconButton onClick={onClickHandler} disabled={disabled}>
                <Delete/>
            </IconButton>
        </div>
    }
)
