import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../common/AddItemsForm";
import {EditableSpan} from "../../common/EditableSpan";
import {Button, IconButton, PropTypes} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {Task} from "../task/Task";
import {TaskStatuses} from "../../api/tasks-api";
import {FilterValuesType, TodoListDomainType} from "../todoLists/todoList-reducer";
import {TaskDomainType} from "../task/tasks-reducer";
import {useActions} from "../../state/store";
import {tasksActions} from "../task";
import {todoListsActions} from "../todoLists";


type PropsType = {
    todoList: TodoListDomainType
    tasks: Array<TaskDomainType>
    demo?: boolean
}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {

        const {fetchTasks, addTask} = useActions(tasksActions)
        const {changeTodoListFilter, removeTodoListTC, changeTodoListTitleTC} = useActions(todoListsActions)

        const addTaskCallback = useCallback((title: string) => {
            addTask({todoListId: props.todoList.id, title: title});
        }, [addTask, props.todoList.id])

        const onFilterButtonClickHandler = useCallback((buttonFilter: FilterValuesType) => {
            changeTodoListFilter({newFilter: buttonFilter, todoListId: props.todoList.id})
        }, [changeTodoListFilter, props.todoList.id]);

        const removeTodoList = () => {
            removeTodoListTC(props.todoList.id)
        }

        const changeTodoListTitle = useCallback((newtTitle: string) => {
            changeTodoListTitleTC({newTitle: newtTitle, todoListId: props.todoList.id})
        }, [changeTodoListTitleTC, props.todoList.id]);

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

        return <div>
            <div className={'todoListTitle'}>
                <h3><EditableSpan title={props.todoList.title} onChangeTitle={changeTodoListTitle}/></h3>
                <IconButton onClick={removeTodoList} disabled={props.todoList.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback} disabled={props.todoList.entityStatus === 'loading'}/>
            <div>
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
        </div>
    }
)
