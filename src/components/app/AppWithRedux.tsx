import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {TaskType} from "../../api/tasks-api";
import {ErrorSnackbar} from "../../common/Allert";
import {TodoLists} from "../todoLists/TodoLists";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {RequestStatusType} from "../../state/app-reducer";
import {BrowserRouter, Route} from 'react-router-dom';
import {Login} from "../../features/login/Login";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}


export const AppWithRedux = ({demo = false}: PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color='secondary'/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodoLists demo={demo}/>}/>
                    <Route exact path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    );
}


export default AppWithRedux;


