import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {ErrorSnackbar} from "../../common/Allert";
import {TodoLists} from "../todoLists/TodoLists";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {initializeAppTC, RequestStatusType} from "../../state/app-reducer";
import {BrowserRouter, HashRouter, Route} from 'react-router-dom';
import {Login} from "../../features/login/Login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {logoutTC} from '../../features/login/auth-reducer';
import {TaskDomainType} from "../../state/tasks-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

type PropsType = {
    demo?: boolean
}


export const AppWithRedux = ({demo = false}: PropsType) => {


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    })

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)


    const logoutHandler = () => {
        dispatch(logoutTC())
    }


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/'} render={() => <TodoLists demo={demo}/>}/>
                <Route exact path={'/login'} render={() => <Login/>}/>
            </Container>
        </div>
    );
}


export default AppWithRedux;


