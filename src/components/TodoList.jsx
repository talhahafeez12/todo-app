import React, {useEffect, useState} from 'react';
import TodoItem from './TodoItem';
import 'reactjs-popup/dist/index.css';
import { db } from '../firebase';
import {ref, get, update, set, remove} from 'firebase/database';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
            const fetchData = async () => {
            const dbRef = ref(db, "/");
            const snapshot = await get(dbRef);
            let all = [];
            for (var i = 1; i < snapshot.val().length; i++) {
                if (snapshot.val()[i] != undefined){
                    all.push(snapshot.val()[i]);
                }
            }
            setTasks(all);
        };
        fetchData();
    }, []);

    const [text, setText] = useState('');
    function addTask(text) {
        const newTask = {
            id: tasks[tasks.length - 1].id + 1,
            text,
            completed: false,
            className: false,             
            date: getDate(),
            editing: false
        };        
        const dbRef = ref(db, '/' + (tasks[tasks.length - 1].id + 1));
        set(dbRef, newTask);
        setTasks([...tasks, newTask]);
        setText('');
    }

    function getDate() {
        var current_datetime = new Date();
        var month = current_datetime.getMonth() + 1;
        var year = current_datetime.getFullYear();
        var day = current_datetime.getDate();
        var hour = current_datetime.getHours();
        var end = "am";
        if (hour >= 12) {
            end = "pm";
        }
        hour = hour % 12;
        var minutes = current_datetime.getMinutes();
        return `${month}/${day}/${year} ${hour}:${minutes}${end}`; 
    }
    
    function deleteTask(id) {
        const dbRef = ref(db, '/' + id);
        remove(dbRef);
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
                const dbRef = ref(db, "/" + id);
                update(dbRef, {
                    text: new_text,
                    date: getDate()
                });
                return {...task, text: new_text, date: getDate(), editing: !task.editing};
            } else {
                return task;
            }
        })); 
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                const dbRef = ref(db, "/" + id);
                update(dbRef, {
                    completed: !task.completed,
                    className: !task.className
                });
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
