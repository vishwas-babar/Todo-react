import React from 'react'
import { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskEditor() {

    const [taskTitle, setTaskTitle] = useState("");
    const [dueDate, setDueDate] = useState("");

    const { todos, addTodo } = useTodoContext();

    function addTaskBtnOnclickHandle() {

        if (taskTitle.trim() == "") {
            toast("First enter some task");
            return;
        }

        addTodo({
            id: Date.now(),
            title: taskTitle,
            dueDate: dueDate,
            completed: false
        });

        if (dueDate.trim() == "") {
            toast('you should set the deadlines...')
        }

        setTaskTitle("");
        setDueDate("");
    }

    return (
        <>
        <div className="tasks-editor">
            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="task-name" type="text" placeholder="Add a todo..." />
            <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="task-date" type="date" />
            <button onClick={addTaskBtnOnclickHandle} className="add-btn">
                <box-icon name="plus" />
            </button>
        </div>
            <ToastContainer />
        </>

    

    )
}

export default TaskEditor