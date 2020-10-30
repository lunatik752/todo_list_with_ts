import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../common/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {TaskDomainType} from "./tasks-reducer";
import {tasksActions} from "./index";
import {useActions} from "../../utils/redux-utils";
import {TaskStatuses} from "../../api/types";


type PropsTaskType = {
    task: TaskDomainType,
    todoListId: string,
}

export const Task = React.memo( (props: PropsTaskType) => {

        const {updateTask, removeTask} = useActions(tasksActions)

        const onClickHandler = useCallback(() => removeTask({taskId: props.task.id, todoListId: props.todoListId}),
            [removeTask, props.task.id, props.todoListId])

        const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            updateTask({
                taskId: props.task.id,
                domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
                todoListId: props.todoListId
            })
        }, [updateTask, props.task.id, props.todoListId])

        const onChangeTitleHandler = useCallback((newtTitle: string) => {
            updateTask({
                taskId: props.task.id,
                domainModel: {title: newtTitle},
                todoListId: props.todoListId
            })
        }, [updateTask, props.task.id, props.todoListId])

        const disabled = props.task.entityTaskStatus === 'loading'


        return <div key={props.task.id}
                    className={props.task.status === TaskStatuses.Completed ? 'isDone' : ''}
                    style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Checkbox color={"primary"}
                      checked={props.task.status === TaskStatuses.Completed}
                      onChange={onChangeStatusHandler}
                      disabled={disabled}
            />
            <EditableSpan title={props.task.title}
                          onChangeTitle={onChangeTitleHandler}
                          disabled={disabled}
            />
            <IconButton onClick={onClickHandler} disabled={disabled} style={{position: 'absolute', right: '5px'}}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </div>
    }
)
