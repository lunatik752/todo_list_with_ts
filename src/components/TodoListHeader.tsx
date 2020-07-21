import React from 'react';
import styles from './TodoListHeader.module.css';

const TodoListHeader = () => {
    return (
        <div className={styles.header}>
            <h1>To-do list</h1>
            <div>
                <input type="text" placeholder='New to-do list name'/>
            </div>
        </div>
    )
}

export default TodoListHeader