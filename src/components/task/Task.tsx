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

        const onClickHandler = () => removeTask({taskId: props.task.id, todoListId: props.todoListId})

        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            updateTask({taskId: props.task.id,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todoListId: props.todoListId})
        }

        const onChangeTitleHandler = useCallback((newtTitle: string) => {
            updateTask({taskId: props.task.id,
                domainModel: {title: newtTitle},
                todoListId: props.todoListId})
        }, [updateTask, props.task.id, props.todoListId])

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
