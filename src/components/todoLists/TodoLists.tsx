import Grid from "@material-ui/core/Grid";
import {AddItemForm} from "../../common/AddItemsForm";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "../todoList/TodoList";
import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {TaskStatuses} from "../../api/tasks-api";
import {Redirect} from "react-router-dom";
import {authSelectors} from "../../features/login";
import {todoListsActions, todoListsSelectors} from "./index";
import {tasksActions, tasksSelectors} from "../task";

import {useActions} from "../../state/store";

type PropsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsType> = ({demo = false}) => {


    const todoLists = useSelector(todoListsSelectors.selectTodoList);
    const tasks = useSelector(tasksSelectors.selectTasks);
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {addTodoListTC, changeTodoListTitleTC, removeTodoListTC, fetchTodoListsTC, changeTodoListFilter} = useActions(todoListsActions)
    const {addTask, removeTask, updateTask} = useActions(tasksActions)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodoListsTC()
    }, [demo, fetchTodoListsTC, isLoggedIn])


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoListTC}/>
        </Grid>

        <Grid container spacing={3}>{
            todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id];

                    return <Grid key={tl.id} item>
                        <Paper style={{padding: "10px", backgroundColor: '#cfe8fc'}}>
                            <TodoList
                                todoList={tl}
                                tasks={tasksForTodoList}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                }
            )}
        </Grid>
    </>
}
