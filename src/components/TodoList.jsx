import React, {useState} from 'react';
import TodoItem from './TodoItem';
import 'reactjs-popup/dist/index.css';

function TodoList() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctor Appointment',
            completed: true,
            className: true,
            date: getDate(),
            editing: false
        }, 
        {
            id: 2,
            text: 'Meeting at School',
            completed: false,
            className: false,
            date: getDate(),
            editing: false
        }
    ]);
    
    const [text, setText] = useState('');
    function addTask(text) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            className: false,             
            date: getDate(),
            editing: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function getDate() {
        var current_datetime = new Date();
        var month = current_datetime.getMonth() + 1;
        var year = current_datetime.getFullYear();
        var day = current_datetime.getDate();
        var hour = current_datetime.getHours();
        hour = hour % 12;
        var minutes = current_datetime.getMinutes();
        return `${month}/${day}/${year} ${hour}:${minutes}`; 
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function editTask(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, editing: !task.editing};
            } else {
                return task;
            }
        }));
    }

    function ChangeText(id, new_text) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, text: new_text, date: getDate(), editing: !task.editing};
            } else {
                return task;
            }
        })); 
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed, className: !task.className};
            } else {
                return task;
            }
        }));
    }

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            {tasks.map(task => (
                <TodoItem key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                editTask={editTask}
                ChangeText={ChangeText}
            />))}
            <div className="to-add">
                <input value={text} onChange={e=> setText(e.target.value)}/>
                <button onClick={() => addTask(text)}>Add</button>
            </div>

        </div>
    );
}

export default TodoList;
