import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';


const LOCAL_STORAGE_KEY="calendarEvents";
var calEvents=[{
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

let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const Calan = () => {
  const [weekends, setWeekends] = useState(true);
  const [events, setEvents] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] =  useState();
  const [errorFound, setErrorFound] = useState(null)
  const [successFound, setSuccessFound] = useState(null)

  const weekendsVisible = () => {
    setWeekends(!weekends);
  };

  const handleClose = () =>{ setShow(false);
    setisEdit(false);
  }

  const handleAdd =(e)=>{
    let ob={
    title:events.title,
    start:events.start,
    end:events.end
  }
    let eventArr = localStorage.getItem('calendarEvents');
    let calEvents = JSON.parse(eventArr);
    if(events.title){
    calEvents.push(ob);
    localStorage.setItem('calendarEvents', JSON.stringify(calEvents));
    setEvents(calEvents);
    console.log("New Ones", calEvents);
    handleClose();
  }
    
  }

  const handleUpdateEvent=(Title, Start, End)=>{
    setErrorFound(null);
    setSuccessFound(null);

      if (!Title) setErrorFound("Title Cannot be Empty")
     else if (!Start) setErrorFound("Start can not be empty")
      else if (!End) setErrorFound("End cannot be empty")
       else {

         try {
            
              let eventList = localStorage.getItem('calendarEvents');
           if (eventList !== null) {

                  let data = JSON.parse(eventList) 

                 var objIndex = data.findIndex((x => x.title == eventList.title));
                   data[objIndex].title = Title;
                   data[objIndex].start = Start;
                  data[objIndex].end = End;

                  localStorage.setItem("calendarEvents", JSON.stringify(data)) ;
                  
                setSuccessFound("User Updated!");
                  
                  if(setSuccessFound){

                  setShow(false);
            }
                  
              }

           } catch (e) {
             console.log(e) //for handling errors
         }
      }
    }

    const addEvent =()=>{
      setisEdit(false);
      setShow(true);

    }; 
 
  const handleDateSelect = (selectInfo) => {
    // let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;    
    setisEdit(false);
    setShow(true);
  
    calendarApi.unselect(); // clear date selection
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
    setEvents(...events);
  };

  const handleEventClick = (eventClickInfo) =>{
    var eventObj = eventClickInfo.event.title;
    events.title=eventClickInfo.event.title;
    console.log(eventObj);
    console.log(eventClickInfo);
    events.end = eventClickInfo.event.end;
    events.start = eventClickInfo.event.start;
    console.log(eventClickInfo.event.start, "Start Time");
    console.log(eventClickInfo.event.end, "End Time");
    setShow(true);
    setisEdit(true);
   
    console.log(eventClickInfo.event.title);
  };

// useEffect(()=>{
  // const retreiveEvent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  // if(retreiveEvent)setEvents(retreiveEvent);
  // },
  // []);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calEvents));
    console.log(calEvents, "CalendEvents");
  },
  [calEvents]);

  return (
    <div className="demo-app-main">
      <Button className="btn-primary" onClick={addEvent}>Add Event</Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
     // eventContent={renderEventContent}  custom render function
        eventClick={handleEventClick}
        // events={[
        //   { title: "Birthday", start: '2022-01-01', end: '2022-01-02'},
        //   { title: "RO Meeting", date: "2022-01-06" },
        // ]}
        events={calEvents}
        // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
      />
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{!isEdit ? "Create Event" : "Update Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, let's create a memorable event now!
          <form>
            <div className="mb-3">
              <label for="eventName" className="col-form-label">
                Event Title:
              </label>
              <input
                type="text"
                className="form-control"
                value={events.title}
                onChange={(e) =>
                  setEvents({ ...events, title: e.target.value })
                }
              
              />
            </div>
            <DatePicker
              placeholderText="Start Date"
              selected={events.start}
              onChange={(start) => setEvents({...events, start })}
           
            />
            <DatePicker
              placeholderText="End Date"
              selected={events.end}
              onChange={(end) => setEvents({...events, end })}
            />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <>
                {!isEdit ? (
                  <Button variant="primary" onClick={()=>handleAdd(title, start, end)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleUpdateEvent(events.title, events.start, events.end,)}>
                    Update
                  </Button>
                )}
              </>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
   
    </div>
  );
};

export default Calan;
