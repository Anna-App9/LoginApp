import React, {useState} from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
// import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import startOfWeek from "date-fns/startOfWeek";
import '../App.css';


const locales={
    "en-US": require("date-fns/locale/en-US")
}


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events=[{
    title:"Big Meet",
    allday:"true",
    start: new Date(2022, 1, 0),
    end: new Date(2022, 1, 0)
},
{
title:"RO Catchup",
allday:"true",
start: new Date(2022, 1, 0),
end: new Date(2022, 1, 0)
},
{
    title:"Holidays",
    allday:"true",
    start: new Date(2022, 1, 14),
    end: new Date(2022, 1, 16)
    }

]
console.log(events);

const Cal = () => {
    const [newEvent, setnewEvent] = useState({ title: "" , start: "", end:""});
    const [allEvents, setallEvents] = useState(events);

    function handleAddEvent(){

        setallEvents=([...allEvents, newEvent])

    }


    return (
        <div>
       <h1 style={{textAlign:"center"}}>Calendar</h1>
        <div className='rbc-calendar'>
            <Calendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: 500, margin:"50px"}}/> 
            
        </div>
        </div>
    )
}

export default Cal;
