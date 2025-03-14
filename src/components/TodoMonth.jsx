// Obtained help from https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript

import React, {useEffect, useState} from 'react';
import TodoList from './TodoList.jsx';

function TodoMonth() {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [totalDays, setTotalDays] = useState([]);        
    const [totalShows, setList] = useState([]);
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
    const [showHeader, setShowHeader] = useState(true);
    useEffect(() => {
        function getMonth() {
            var current_datetime = new Date();
            var month = current_datetime.getMonth() + 1;
            setMonth(month);
        }
        getMonth();
        
        function getYear() {
            var current_datetime = new Date();
            var year = current_datetime.getFullYear();
            setYear(year);
        }
        getYear();
        
        function getTotalDays() {
            var total = new Date(year, month, 0).getDate();
            var total_arr = [];
            var total_show_arr = [];
            for (var i = 0; i < total; i++) {
                total_arr.push(i + 1);
                total_show_arr.push({showButton: true, showList: false});
            }
            setList(total_show_arr);
            setTotalDays(total_arr);
            
        }
        getTotalDays();
    }, [year, month]);

    function showList(day) {
        var new_arr = [...totalShows];
        totalShows.map((showing, index) => {
            if (day === index + 1) {
                new_arr[index].showList = true;
                new_arr[index].showButton = false;
            } else {
                new_arr[index].showButton = false;
            }
            return new_arr;
        });
        setList(new_arr);
        setShowHeader(false);
    }

    function showMonths(day) {
        var new_arr = [...totalShows];
        totalShows.map((showing, index) => {
            if (day === index + 1) {
                new_arr[index].showList = false;
                new_arr[index].showButton = true;
            } else {
                new_arr[index].showButton = true;
            }
            return new_arr;
        });
        setList(new_arr);
        setShowHeader(true);
    }

    return (
        <div className="todo-month">
            {showHeader && <h1>To-Do List - {`${months[month - 1]} ${year}`}</h1>}
            <div className="todo-days">
                {totalDays.map((day, index) => (
                    <>
                        {totalShows[day - 1].showList && <button key={day + "Home"} className='listButtons' onClick={() => showMonths(day)}>Home</button>}
                        {totalShows[day - 1].showList && <button key={day + "Back"} className='listButtons' onClick={() => showMonths(day)}>Go Back</button>}
                        {totalShows[day - 1].showButton && <button key={day} className='listButtons' onClick={() => showList(day)}>{day}</button>}
                        {totalShows[day - 1].showList && <TodoList id={index + 1} day={day} month={month} year={year}/>}
                    </>
                ))}
            </div>
        </div>
    );
}

export default TodoMonth;

