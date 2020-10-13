  import {tasksReducer} from '../task/tasks-reducer';
import {TasksStateType} from '../app/App';
import {addTodoListTC, TodoListDomainType, todoListReducer} from "../todoList/todoList-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: 'newTodo'
    };
    const action = addTodoListTC.fulfilled({todoList}, 'requestId', todoList.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});

