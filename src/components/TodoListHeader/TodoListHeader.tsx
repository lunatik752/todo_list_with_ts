import React from 'react';
import styles from './TodoListHeader.module.css';
import logo from '../../assets/image/logo.png'
import Button from "../common/Button/Button";
import { NavLink } from 'react-router-dom';



const TodoListHeader = () => {
    return (

        <div className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <div className={styles.titleWrapper}>
                    <img className={styles.logo} src={logo}  alt='logo'/>
                    <h1>The TodoList</h1>
                </div>
                {/*<Navbar/>*/}
                <NavLink to={'/login'}><Button name='Login'/></NavLink>
            </div>
        </div>


        // <div className={styles.header}>
        //     <h1>To-do list</h1>
        //     <div>
        //         <input type="text" placeholder='New to-do list name'/>
        //     </div>
        // </div>
    )
}

export default TodoListHeader