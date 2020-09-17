import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

let startState: TasksStateType;

beforeEach(() => {
   startState = {
       "todoListId1": [
           {id: "1", title: "CSS", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
           {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todoListId1", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
           {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todoListId1", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''}
       ],
       "todoListId2": [
           {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
           {id: "2", title: "milk", status: TaskStatuses.New, todoListId: "todoListId2", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''},
           {id: "3", title: "tea", status: TaskStatuses.Completed, todoListId: "todoListId2", addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Hi , startDate: ''}
       ]
   }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id !== "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        title: 'juice',
        status: TaskStatuses.New,
        id: 'id exist',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Hi,
        startDate: '',
        todoListId: "todoListId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});


test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'coffee', "todoListId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe('coffee');
    expect(endState["todoListId1"].length).toBe(3);

});


test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});



test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todoListId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
});



test('empty arrays should be added when we set todoLists', () => {
    const action = setTodoListsAC([
        {id: "1", title: "title 1", order: 0, addedDate: ""},
        {id: "2", title: "title 2", order: 0, addedDate: ""}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
    const action = setTasksAC(startState["todoListId1"], "todoListId1");

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": []
    }, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(0)
})








