import {
    tasksReducer, changeTaskEntityStatusAC, fetchTasksTC, removeTaskTC, addTaskTC, updateTaskTC
} from './tasks-reducer';
import {TasksStateType} from '../app/App';
import {addTodoListTC, fetchTodoListsTC, removeTodoListTC} from "../todoLists/todoList-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todoListId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todoListId1",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ],
        "todoListId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.New,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.Completed,
                todoListId: "todoListId2",
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: '',
                entityTaskStatus: 'idle'
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const params = {taskId: "2", todoListId: "todoListId2"};
    const action = removeTaskTC.fulfilled(params, '', params);

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id !== "2")).toBeTruthy();
});


test('correct task should be added to correct array', () => {

    const task = {
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
    };
    const action = addTaskTC.fulfilled({task}, 'requestId', {todoListId: task.todoListId, title: task.title});

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
const params = {
    taskId: "2", domainModel: {
        title: 'juice',
        description: '',
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        deadline: ''
    }, todoListId: "todoListId2"
}
    const action = updateTaskTC.fulfilled(params,
        'requestId', params);

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
});


test('title of specified task should be changed', () => {
    const params = {
        taskId: "2", domainModel: {
            title: 'coffee',
            description: '',
            status: TaskStatuses.New,
            priority: 0,
            startDate: '',
            deadline: ''
        }, todoListId: "todoListId2"
    }
    const action = updateTaskTC.fulfilled(params,
        'requestId', params);


    const endState = tasksReducer(startState, action)

    expect(endState["todoListId2"][1].title).toBe('coffee');
    expect(endState["todoListId1"].length).toBe(3);

});


test('new array should be added when new todolist is added', () => {

    const todoList = {
        id: 'todoListId3',
        addedDate: '',
        order: 0,
        title: "new todoList"
    };
    const action = addTodoListTC.fulfilled({todoList}, 'requesId', todoList.title);
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

    const action = removeTodoListTC.fulfilled({todoListId: "todoListId2"}, 'requestId',  "todoListId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
});


test('empty arrays should be added when we set todoLists', () => {
    const payload = {
        todoLists: [
            {id: "1", title: "title 1", order: 0, addedDate: ""},
            {id: "2", title: "title 2", order: 0, addedDate: ""}
        ]
    }
    const action = fetchTodoListsTC.fulfilled(payload,'requestId')

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
})

test('tasks should be added for todolist', () => {
    const action = fetchTasksTC.fulfilled({tasks: startState["todoListId1"], todoListId: "todoListId1"},'requestId',"todoListId1");

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": []
    }, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(0)
})

test('entityTaskStatus should be changed for task ', () => {
    const action = changeTaskEntityStatusAC({todoListId: "todoListId1", taskId: '1', entityTaskStatus: 'loading'});

    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"][0].entityTaskStatus).toBe('loading')
    expect(endState["todoListId1"][1].entityTaskStatus).toBe('idle')
})






