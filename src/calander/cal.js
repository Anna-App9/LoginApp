import React, {useState, useEffect} from 'react';
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
import Modal from 'react-bootstrap/Modal';
import { DragDropContext } from "react-dnd";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";



const locales={
    "en-US": require("date-fns/locale/en-US")
}
const LOCAL_STORAGE_KEY="events"

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

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
// console.log(events.getEvents());

console.log(events);
// function eventClick(allEvents) {
//   {allEvents.map((event,index)=>{
//     <div key={index}>
//   <div>'Event: ' {event.title}</div>
//   {/* alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
//   alert('View: ' + info.view.type); */}
// {/* 
//   // change the border color just for fun
//   // info.el.style.borderColor = 'red'; */}
  
//   </div>
//   }
//   )
//   }
// }




const Cal = () => {
  useEffect(()=>{
    const retreiveEvent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retreiveEvent)setallEvents(retreiveEvent);
    },
    []);
  
    useEffect(()=>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    },
    [events]);
    const [newEvent, setnewEvent] = useState({ title: "" , start: "", end:""});
    var   [allEvents, setallEvents] = useState(events);
    const [isEdit, setisEdit]=useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () =>{ setShow(false);
      setisEdit(false);}
    const handleShow = () => setShow(true);

    function handleUpdateEvent(){

    };
    function handleEditEvent(){

      setisEdit(true);
      setShow(true);

    };


    function handleAddEvent(){
      setisEdit(false);
      setallEvents([...allEvents, newEvent])
      console.log(allEvents);
    };
    function eventClick(allEvents) {
      {allEvents.map((event,index)=>{
        <div key={index}>
      <div>Event: {event.title}</div>
      {/* alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type); */}
      </div>
      }
      )
      }
      console.log(allEvents)
    }

    return (
        <div>
       <h1 style={{textAlign:"center"}}>Calendar</h1>
       <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ !isEdit? "Create Event" : "Update Event" }</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, let's create a memorable event now!
        <form>
          <div className="mb-3">
            <label for="eventName" className="col-form-label">Event Title:</label>
            <input type="text" className="form-control" value={newEvent.title} onChange={(e)=>setnewEvent({...newEvent, title:e.target.value})}/>
          </div>
          <DatePicker placeholderText='Start Date' selected={newEvent.start} onChange={(start)=>setnewEvent({...newEvent, start})}/>
          <DatePicker placeholderText='End Date' selected={newEvent.end} onChange={(end)=>setnewEvent({...newEvent, end})}/>
         
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <>
          {
            !isEdit?
          
          <Button variant="primary" onClick={handleAddEvent}>
            Save
          </Button>
 :  
          <Button variant="primary" onClick={handleUpdateEvent}>
            Update
          </Button>
}
          </>
        </Modal.Footer>
        </form>
        </Modal.Body>
        </Modal>
        <Button onClick={handleEditEvent}> Edit</Button>
        {/* {allEvents.map((event,index)=>{
             return (
              <div key={index}>

              <ul>{event.title}</ul>
              <ul>{event.start}</ul>
              </div>
          )

        })} */}
        <div className='rbc-calendar'>
            <Calendar localizer={localizer} events={allEvents} 
            startAccessor="start" endAccessor="end" style={{height: 500, margin:"50px"}} onClick={eventClick}/> 

            {/* <DragAndDropCalendar
        selectable
        events={events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView={BigCalendar.Views.MONTH}
        defaultDate={new Date(2015, 3, 12)}
      /> */}

        </div>
        </div>
    )
}

export default Cal;
