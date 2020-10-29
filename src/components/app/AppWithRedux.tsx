import React, {useEffect, useCallback} from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import Container from "@material-ui/core/Container";
import {ErrorSnackbar} from "../../common/Alert";
import {TodoLists} from "../todoLists/TodoLists";
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import {authActions, authSelectors, Login} from "../../features/login";
import CircularProgress from "@material-ui/core/CircularProgress";
import {TaskDomainType} from "../task/tasks-reducer";
import {appActions, appSelectors} from '.';
import {useActions} from "../../utils/redux-utils";


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

type PropsType = {
    demo?: boolean
}


export const AppWithRedux = ({demo = false}: PropsType) => {


    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const status = useSelector(appSelectors.selectStatus)
    const {initializeApp} = useActions(appActions)
    const {logout} = useActions(authActions)


    const isInitialized = useSelector(appSelectors.selectIsInitialized)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [initializeApp])

    const logoutHandler = useCallback(() => {
        logout()
    }, [logout])

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


