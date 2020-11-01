import {TodoListDomainType} from "./todoList-reducer";
import {TasksStateType} from "../app/AppWithRedux";
import {todoListsActions, todoListsReducer} from "./index";
import {tasksReducer} from "../task";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: 'newTodo'
    };

    const action = todoListsActions.addTodoListTC.fulfilled({todoList}, 'requestId', todoList.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});

