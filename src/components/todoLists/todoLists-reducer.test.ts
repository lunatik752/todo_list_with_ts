import {
    todoListReducer,
    changeTodoListFilter,
    TodoListDomainType,
    FilterValuesType,
    changeTodoListEntityStatus
} from './todoList-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../app/app-reducer";
import {addTodoListTC, changeTodoListTitleTC, fetchTodoListsTC, removeTodoListTC} from "./todoList-actions";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]

})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListTC.fulfilled({todoListId: todolistId1}, 'requestID', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: newTodolistTitle
    };
    const endState = todoListReducer(startState, addTodoListTC.fulfilled({todoList}, 'requestId',newTodolistTitle ))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].entityStatus).toBe('idle');
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const payload = {newTitle: newTodolistTitle, todoListId: todolistId2};
    const endState = todoListReducer(startState, changeTodoListTitleTC.fulfilled(payload, 'requestId', payload));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListReducer(startState, changeTodoListFilter({newFilter, todoListId: todolistId2}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('todoLists should be added', () => {

    const action = fetchTodoListsTC.fulfilled({todoLists: startState}, 'requestId' );

    const endState = todoListReducer([], action);

    expect(endState.length).toBe(2);
});


test('entity status todoList should be changed', () => {
    const newStatus: RequestStatusType = 'loading'

    const action = changeTodoListEntityStatus({todoListId: todolistId1, entityStatus: newStatus});

    const endState = todoListReducer(startState, action);

    expect(endState[0].entityStatus).toBe(newStatus);
    expect(endState[1].entityStatus).toBe('idle');
});









