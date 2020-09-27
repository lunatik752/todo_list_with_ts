  import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../components/app/App';
import {addTodoListAC, TodoListDomainType, todoListReducer} from "./todoList-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC({todoList: {
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: 'newTodo'
    }});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});

