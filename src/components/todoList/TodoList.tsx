import React, {useCallback, useEffect} from "react";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../common/AddItemsForm";
import {EditableSpan} from "../../common/EditableSpan";
import {Button, IconButton, PropTypes, Paper} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "../task/Task";
import {FilterValuesType, TodoListDomainType} from "../todoLists/todoList-reducer";
import {TaskDomainType} from "../task/tasks-reducer";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {TaskStatuses} from "../../api/types";
import { tasksActions } from "../task";
import { todoListsActions } from "../todoLists";



type PropsType = {
    todoList: TodoListDomainType
    tasks: Array<TaskDomainType>
    demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {

        const {fetchTasks} = useActions(tasksActions)
        const {changeTodoListFilter, removeTodoListTC, changeTodoListTitleTC} = useActions(todoListsActions)

        const dispatch = useAppDispatch()

        const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
            let thunk = tasksActions.addTask({title: title, todoListId: props.todoList.id,});
            const resultAction = await dispatch(thunk)
            if (tasksActions.addTask.rejected.match(resultAction)) {
                if (resultAction.payload?.errors?.length) {
                    const error = resultAction.payload?.errors[0]
                    helper.setError(error)
                } else {
                    helper.setError('Some error occurred')
                }
            } else {
                helper.setTitle('')
            }
        }, [dispatch, props.todoList.id])


        const removeTodoList = () => {
            removeTodoListTC(props.todoList.id)
        }

        const changeTodoListTitle = useCallback((newtTitle: string) => {
            changeTodoListTitleTC({newTitle: newtTitle, todoListId: props.todoList.id})
        }, [changeTodoListTitleTC, props.todoList.id]);

        const onFilterButtonClickHandler = useCallback((buttonFilter: FilterValuesType) => {
            changeTodoListFilter({newFilter: buttonFilter, todoListId: props.todoList.id})
        }, [changeTodoListFilter, props.todoList.id]);

        let tasksForTodoList = props.tasks;

        if (props.todoList.filter === 'active') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
        }
        if (props.todoList.filter === 'completed') {
            tasksForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
        }


        useEffect(() => {
            if (demo) {
                return
            }
            fetchTasks(props.todoList.id)
        }, [demo, fetchTasks, props.todoList.id])


        const renderFilterButton = (
            buttonFilter: FilterValuesType,
            color: PropTypes.Color,
            text: string) => {
            return <Button variant={props.todoList.filter === buttonFilter ? 'outlined' : 'text'}
                           onClick={() => {
                               onFilterButtonClickHandler(buttonFilter);
                           }}
                           color={color}>
                {text}
            </Button>
        }

        return <Paper style={{position: 'relative'}}>
            <div className={'todoListTitle'}>
                <IconButton style={{position: 'absolute', right: '5px', top: '7px'}} onClick={removeTodoList}
                            disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
                <h3><EditableSpan title={props.todoList.title} onChangeTitle={changeTodoListTitle}/></h3>

            </div>
            <AddItemForm addItem={addTaskCallback} disabled={props.todoList.entityStatus === 'loading'}/>
            <div>

                {!tasksForTodoList.length && <div style={{padding: '10px', color: 'gray'}}>No tasks</div>}
                {tasksForTodoList.map(task => <Task
                    key={task.id}
                    task={task}
                    todoListId={props.todoList.id}/>)}
            </div>
            <div>
                {renderFilterButton("all", "default", 'All')}
                {renderFilterButton("active", "primary", 'Active')}
                {renderFilterButton("completed", "secondary", 'Completed')}
            </div>
        </Paper>
    }
)
