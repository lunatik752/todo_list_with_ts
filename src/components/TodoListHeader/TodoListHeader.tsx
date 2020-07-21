import React from 'react';
import styles from './TodoListHeader.module.css';
import logo from '../../assets/image/logo.png'
import Button from "../common/Button/Button";
import {NavLink} from 'react-router-dom';

type PropsType = {

}

const TodoListHeader = (props: PropsType) => {
    return (

        <div className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <div className={styles.titleWrapper}>
                    <img className={styles.logo} src={logo} alt='logo'/>
                    <h1>The TodoList</h1>
                </div>

                <div className={styles.loginBlock}>
                        <NavLink to={'/login'}><Button name='Login'/></NavLink>
                </div>
            </div>
        </div>
    )
}

export default TodoListHeader