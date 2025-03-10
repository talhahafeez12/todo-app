import React, {useState} from 'react';
import { ButtonGroup } from '@mui/material';

function TodoItem({task, deleteTask, toggleCompleted, editTask, ChangeText}) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    const [text, setText] = useState('');
    function DoneChanging(id) {
        ChangeText(id, text);
        setText('');
    }
    
    return (
        <div className={task.className ? 'todo-item-completed': 'todo-item-not-completed'}>
            <input type="checkbox"
            checked={task.completed}
            onChange={handleChange}/>

            {task.editing && <input value={text} onChange={e=> setText(e.target.value)}/>}
            {task.editing && <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                    <button onClick={() => editTask(task.id)}>X</button>
                    <button onClick={() => DoneChanging(task.id)}>Done</button>
                </ButtonGroup>}
            {!task.editing && <p>{task.text}
            <br/>
                {task.date}
            </p>
            }
            {!task.editing && <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                <button onClick={() => deleteTask(task.id)}>X</button>
                <button onClick={() => editTask(task.id)}>Edit</button>
            </ButtonGroup>}
                 
        </div>
    );
}

export default TodoItem;
