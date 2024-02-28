import React, { useContext, useState } from 'react'
import ActionComp from './ActionComp'
import Table from './Table'
import EditModal from './EditModal'
import TaskEditor from './TaskEditor'
import { useTodoContext } from '../contexts/TodoContext'

function Main() {

    const { todos, addTodo, deleteAll, removeTodo, completeTodo, updateTodo } = useTodoContext();

    const [editModalViewStatus, seteditModalViewStatus] = useState("hidden");
    const [overlay, setOverlay] = useState("hidden");

    const [filterOn, setFilterOn] = useState("all");
    const [dropdownState, setDropdownState] = useState("hidden");

    function showDropDown() {
        console.log('showing the dropdown for filter task');
        setDropdownState('block');
    }

    function filterTasksComplete() {
        setFilterOn('complete');
        setDropdownState('hidden');
    }

    function filterTasksPending() {
        setFilterOn('pending');
        setDropdownState('hidden');
    }

    function removeAllFilters() {
        setFilterOn("all");
        setDropdownState('hidden');
    }

    function showEditModal() {
        seteditModalViewStatus('activate-edit-modal ');
    }


    const [editTodoId, setEditTodoId] = useState('');
    const [editTaksTitle, setEditTaksTitle] = useState("");
    const [editTaskDuedate, setEditTaskDuedate] = useState("");

    const onclickForEditBtn = (e) => {
        const todoId = e.target.closest('tr').dataset.setId;
        setEditTodoId(todoId);

        // give the title and date to states to access it in edit todo modal
        todos.map(todo => {
            if (todo.id == todoId) {
                setEditTaksTitle(todo.title);
                setEditTaskDuedate(todo.dueDate);
            }
        })

        showEditModal();
        setOverlay("block")
    }

    function saveTheEditedTodo() {

        const todo = {
            title: editTaksTitle,
            dueDate: editTaskDuedate,
        }

        updateTodo(editTodoId, todo);
        setOverlay("hidden");
        seteditModalViewStatus("hidden");
    }

    return (
        <>
            <main>
                <h1 className="todo"><span>Todo List</span></h1>

                <ActionComp
                    showDropDown={showDropDown}
                    setFilterOnComplete={filterTasksComplete}
                    setFilterOnPending={filterTasksPending}
                    removeAllFilters={removeAllFilters}
                    dropdownState={dropdownState}
                    deleteAll={deleteAll}
                />
                <Table
                    filterOn={filterOn}
                    onclickForEditBtn={onclickForEditBtn}
                />

            </main>

            <EditModal
                editTaksTitle={editTaksTitle}
                editTaskDuedate={editTaskDuedate}
                editModalViewStatus={editModalViewStatus}
                saveTheEditedTodo={saveTheEditedTodo}
                onchangeForDateInput={(e) => { setEditTaskDuedate(e.target.value) }}
                onchangeForTaskInput={(e) => { setEditTaksTitle(e.target.value) }}
            />

            <div 
            className={`overlay ${overlay}`}
                onClick={() => {
                    setOverlay("hidden");
                    seteditModalViewStatus("hidden")
                }}
            ></div>

            <TaskEditor />
        </>
    )
}

export default Main