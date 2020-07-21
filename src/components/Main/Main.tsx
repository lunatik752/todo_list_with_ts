import React from 'react';
import styles from './Main.module.css';
import TodoListHeader from '../TodoListHeader/TodoListHeader';
import Routes from "../Routes/Routes";


const Main = () => {
    return (
        <div className={styles.appWrapper}>
            <div className={styles.container}>
                <TodoListHeader/>
                <Routes/>
            </div>
        </div>
    );
}

export default Main;


