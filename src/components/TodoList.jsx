import React, {useEffect, useState} from 'react';
import TodoItem from './TodoItem';
import 'reactjs-popup/dist/index.css';
import { db } from '../firebase';
import {ref, get, update, set, remove} from 'firebase/database';

function TodoList({day, month, year}) {
    const [tasks, setTasks] = useState([]);
    const months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
            const fetchData = async () => {
            const dbRef = ref(db, "/" + month + "/" + day);
            const snapshot = await get(dbRef);
            let all = [];
            for (let id in snapshot.val()) {
                if (id !== undefined) {
                    all.push(snapshot.val()[id]);
                }
            }
            setTasks(all);
        };
        
        fetchData();
    }, [day, month]);

    const [text, setText] = useState('');
    function addTask(text) {
        var newTask;
        var dbRef;
        if (tasks.length === 0) {
            newTask = {
                id: 1,
                text: text,
                completed: false,
                className: false,             
                date: getDate(),
                editing: false
            };
            dbRef = ref(db, "/" + month + "/" + day + '/' + (1));
        } else {
            newTask = {
                id: tasks[tasks.length - 1].id + 1,
                text: text,
                completed: false,
                className: false,             
                date: getDate(),
                editing: false
            }; 
            dbRef = ref(db, "/" + month + "/" + day + '/' + (tasks[tasks.length - 1].id + 1));
        }
       
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
        const dbRef = ref(db, "/" + month + "/" + day + '/' + id);
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
                const dbRef = ref(db, "/" + month + "/" + day + '/' + id);
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
                const dbRef = ref(db, "/" + month + "/" + day + '/' + id);
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
            <h1>To-Do List - {`${months[month - 1]} ${day}, ${year}`}</h1>
            {tasks.map(task => (
                <TodoItem key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                editTask={editTask}
                ChangeText={ChangeText}
            />))}
            <div className="to-add">
                <input value={text} className="inputTask" onChange={e=> setText(e.target.value)}/>
                <button className='listButtons' onClick={() => addTask(text)}>Add</button>
            </div>

        </div>
    );
}

export default TodoList;
