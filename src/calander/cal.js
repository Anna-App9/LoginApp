import React, {useState} from 'react';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import startOfWeek from "date-fns/startOfWeek";
import '../App.css';
import './popup.css';
import Modal from 'react-bootstrap/Modal'


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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
 
    const handleAddEvent=()=>{
        setallEvents=([...allEvents, newEvent]);
    }


    return (
        <div>
       <h1 style={{textAlign:"center"}}>Calendar</h1>
       <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, let's create a memorable event now!
        <form>
          <div className="mb-3">
            <label for="eventName" className="col-form-label">Event Title:</label>
            <input type="text" className="form-control" value={newEvent.title} onChange={(e)=>setnewEvent({...newEvent, title:e.target.value})}/>
          </div>

          <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start)=>setnewEvent({...newEvent, start})}/>
          <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end)=>setnewEvent({...newEvent, end})}/>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        <div className='rbc-calendar'>
            <Calendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: 500, margin:"50px"}}/> 
        </div>
        </div>
    )
}

export default Cal;
