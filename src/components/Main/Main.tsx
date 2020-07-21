import React from 'react';
import styles from './Main.module.css';
import TodoListHeader from '../TodoListHeader';


const Main = () => {
    return (
        <div className={styles.appWrapper}>
            <div className={styles.container}>
                <TodoListHeader/>
                <div className={styles.body}>
                    <div className={styles.test}>1</div>
                </div>
            </div>
        </div>
    );
}

export default Main;


