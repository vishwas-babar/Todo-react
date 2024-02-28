import React from 'react'

function EditModal({
    onchangeForTaskInput,
    onchangeForDateInput,
    editModalViewStatus,
    editTaksTitle,
    editTaskDuedate,
    saveTheEditedTodo,
}) {
    return (
        <div className={`edit-modal ${editModalViewStatus}`} >
            <input value={editTaksTitle} onChange={onchangeForTaskInput} className="edit-task-name" type="text" placeholder="Edit a todo..." />
            <input value={editTaskDuedate} onChange={onchangeForDateInput} className="edit-task-date" type="date" defaultValue="" />
            <button onClick={saveTheEditedTodo} className="update-btn">
                <box-icon name="check" />
            </button>
        </div>
    )
}

export default EditModal