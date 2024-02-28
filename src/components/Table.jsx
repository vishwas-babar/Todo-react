import React, { useEffect, useState } from 'react'
import { useTodoContext } from '../contexts/TodoContext'

function TaskRow({ id, title, dueDate, completed, onClickCompleteTodoBtn, onClickEditBtn, onClickRemoveTodoBtn }) {

    return (
        <tr data-set-id={id} className={completed ? 'task-row-completed' : ""} >
            <td className='title'>{title}</td>
            <td className='duedate'>{dueDate}</td>
            <td>{completed ? "complete" : "pending"}</td>
            <td>
                <button onClick={onClickEditBtn} class="edit-btn"><i class='bx bx-edit-alt' ></i></button>
                <button onClick={onClickCompleteTodoBtn} class="done-btn"><i class='bx bx-check'></i></button>
                <button onClick={onClickRemoveTodoBtn} class="remove-btn"><i class='bx bx-trash'></i></button>
            </td>
        </tr>
    )
}

function Table({ filterOn, onclickForEditBtn }) {


    const { todos, removeTodo, completeTodo, updateTodo } = useTodoContext();
    const [tasks, setTasks] = useState(todos)


    useEffect(() => {
        setTasks(todos);
        if (filterOn == "all") {
            setTasks(todos)
        }else if (filterOn == "complete") {
            setTasks(prev => prev.filter( task => task.completed == true ));
        }else{
            setTasks(prev => prev.filter(task => task.completed == false))
        }
    }, [filterOn, todos])

    function onClickRemoveTodoBtn(event) {
        const todoId = event.target.closest('tr').dataset.setId;
        removeTodo(todoId);
    }

    function onClickCompleteTodoBtn(event) {
        const todoId = event.target.closest('tr').dataset.setId;
        completeTodo(todoId);
    }

    return (
        <div className="tasks-container">
            <table className="task-table">
                <tbody>
                    <tr>
                        <th>TASK</th>
                        <th>DUE DATE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>

                    {
                        tasks.map(todo => <TaskRow key={todo.id} id={todo.id} title={todo.title} dueDate={todo.dueDate} completed={todo.completed} onClickCompleteTodoBtn={onClickCompleteTodoBtn} onClickRemoveTodoBtn={onClickRemoveTodoBtn} onClickEditBtn={onclickForEditBtn}  />)
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Table;