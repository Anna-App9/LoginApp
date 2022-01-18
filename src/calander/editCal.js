import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {v4 as uuidv4}  from "uuid";


//------------------Fetch Clicked Event Details------------------
var curEvent = JSON.parse(localStorage.getItem("currentEvent"));

//------------------Add Default Events------------------
var calEvents = [
  {
    id: 1,
    title: "Big Meet",
    allday: "true",
    start: new Date(2022, 1, 0),
    end: new Date(2022, 1, 0),
  },
  {
    id: 2,
    title: "RO Catchup",
    allday: "true",
    start: new Date(2022, 1, 0),
    end: new Date(2022, 1, 0),
  },
  {
    id: 3,
    title: "Holidays",
    allday: "true",
    start: new Date(2022, 1, 14),
    end: new Date(2022, 1, 16),
  },
];


let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
const Calan = () => {
  const [weekends, setWeekends] = useState(true);
  const [events, setEvents] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [errorFound, setErrorFound] = useState(null);
  const [successFound, setSuccessFound] = useState(null);

  const weekendsVisible = () => {
    setWeekends(!weekends);
  };

  const handleClose = () => {
    setShow(false);
    setisEdit(false);
  };

  // .fullCalendar( ‘refetchEventSources’, calEvents )

  //------------------Add Event Function------------------
  const handleAdd = () => {
    let ob = {
      id : uuidv4(),
      title: events.title,
      start: events.start,
      end: events.end,
    };
    let eventArr = localStorage.getItem("calendarEvents");
    let calEvents = JSON.parse(eventArr);
    if (events.title) {
      calEvents.push(ob);
      localStorage.setItem("calendarEvents", JSON.stringify(calEvents));
      setEvents(calEvents);
      console.log("New Events:", calEvents);
      handleClose();
    }
  };

  //------------------Update function------------------
  const handleUpdateEvent = (Title, Start, End) => {
    setErrorFound(null);
    setSuccessFound(null);

    if (!Title) setErrorFound("Title Cannot be Empty");
    else if (!Start) setErrorFound("Start can not be empty");
    else if (!End) setErrorFound("End cannot be empty");
    else {
      try {
        let eventDetails = localStorage.getItem("calendarEvents");

        if (eventDetails !== null) {
          let data = JSON.parse(eventDetails);
          console.log(data);

          var objIndex = data.findIndex((x) => x.id == curEvent.id);
          data[objIndex].title = Title;
          data[objIndex].start = Start;
          data[objIndex].end = End;

          localStorage.setItem("calendarEvents", JSON.stringify(data));
          var newEvents = localStorage.getItem("calendarEvents");
          calEvents = JSON.parse(newEvents);
          setEvents(calEvents);

          setSuccessFound("Event Updated!");

          if (setSuccessFound) {
            setShow(false);
          }
        }
      } catch (e) {
        console.log(e); //for handling errors
      }
    }
  };

  const addEvent = () => {
    setisEdit(false);
    setShow(true);
  };

  //------------------Even Add on Select Date------------------
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

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

  //------------------Edit Event on Click------------------

  const handleEventClick = (eventClickInfo) => {
    //to view calendar
    let calendarApi = eventClickInfo.view.calendar;
    console.log(eventClickInfo, "inFO");
    let curOb = {
      id: eventClickInfo.event.id,
      title: eventClickInfo.event.title,
      start: eventClickInfo.event.start,
      end: eventClickInfo.event.end,
    };
    console.log(curOb);
    localStorage.setItem("currentEvent", JSON.stringify(curOb));
    events.title = eventClickInfo.event.title;
    events.end = eventClickInfo.event.end;
    events.start = eventClickInfo.event.start;
    console.log(eventClickInfo.event.start, "Start Time");
    console.log(eventClickInfo.event.end, "End Time");
    setShow(true);
    setisEdit(true);

    console.log(eventClickInfo.event.title);
  };

 //------------------Set Localstorage------------------
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(calEvents));
  }, [calEvents]);

  return (
    <div className="demo-app-main">
      <Button className="btn-primary" onClick={addEvent}>
        Add Event
      </Button>
      {errorFound !== null ? (
        <div className="alert alert-danger"> {errorFound} </div>
      ) : null}
      {successFound !== null ? (
        <div className="alert alert-success"> {successFound} </div>
      ) : null}
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
              onChange={(start) => setEvents({ ...events, start })}
            />
            <DatePicker
              placeholderText="End Date"
              selected={events.end}
              onChange={(end) => setEvents({ ...events, end })}
            />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <>
                {!isEdit ? (
                  <Button
                    variant="primary"
                    onClick={() => handleAdd(title, start, end)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleUpdateEvent(events.title, events.start, events.end)
                    }
                  >
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
