import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title: "this is title for to do",
            dueDate: '23 feb 2024',
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (todo) => {},
    completeTodo: (todo) => {},
    removeTodo: (todo) => {},
    deleteAll: () => {}
});


export const TodoProvider = TodoContext.Provider;

// custom hook for accessing the context data
export function useTodoContext() {
    return useContext(TodoContext);
}