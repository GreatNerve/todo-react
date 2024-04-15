import {createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = {
    todos: 
    [
        {id: 1, text: "Learn HTML,CSS and JS", completed: true},
        {id: 2, text: "Learn Python", completed: false},
        {id: 3, text: "Learn React", completed: true},
        {id: 4, text: "Learn Redux", completed: true},
        {id: 5, text: "Learn Tailwind CSS", completed: true},
        {id: 6, text: "Learn Next.js", completed: false},
    ]


}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        initializeTodos: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload.text,
                completed: action.payload.completed || false
            }
            state.todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if(todo){
                todo.completed = !todo.completed
            }
            localStorage.setItem('todos', JSON.stringify(state.todos))
        }
    }
})

export const {addTodo, removeTodo, toggleTodo, initializeTodos} = todoSlice.actions

export default todoSlice.reducer