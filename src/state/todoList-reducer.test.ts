import {
    todoListReducer,
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    TodoListDomainType,
    FilterValuesType, setTodoListsAC
} from './todoList-reducer';
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListDomainType>

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus:'succeeded'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus:'succeeded' }
    ]

})

test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


    const endState = todoListReducer(startState, addTodoListAC({
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: newTodolistTitle
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
    expect(endState[0].entityStatus).toBe('succeeded');
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const endState = todoListReducer(startState, changeTodoListTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListReducer(startState, changeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('todoLists should be added', () => {

    const action = setTodoListsAC(startState);

    const endState = todoListReducer([], action);

    expect(endState.length).toBe(2);
});









