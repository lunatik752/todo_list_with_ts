import React from 'react';
import styles from './Main.module.css';
import TodoListHeader from './TodoListHeader/TodoListHeader';
import Routes from "../common/Routes/Routes";
import {Provider} from "react-redux";


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


