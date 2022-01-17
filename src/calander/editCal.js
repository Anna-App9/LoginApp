import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';



const Calan = () => {
  const [weekends, setWeekends] = useState(true);
  const [events, setEvents] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();

  const weekendsVisible = () => {
    setWeekends(!weekends);
  };
  const handleClose = () =>{ setShow(false);
    setisEdit(false);}
  const handleShow = () => setShow(true);
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  function handleUpdateEvent(){

  };
  function handleEditEvent(){

    setisEdit(true);
    setShow(true);

  };

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
  };

  const handleEventClick = (eventClickInfo) => {
    var eventObj = eventClickInfo.title;
    console.log(eventClickInfo);
    setShow(true);
    setisEdit(true);
    alert("Event: " + eventClickInfo.event.title);
    alert(
      "Coordinates: " +
        eventClickInfo.jsEvent.pageX +
        "," +
        eventClickInfo.jsEvent.pageY
    );
    alert("View: " + eventClickInfo.view.type);
    events.title = eventClickInfo.event.title;
    console.log(eventClickInfo.event.title);
  };

  console.log(events);

  return (
    <div className="demo-app-main">
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
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        events={[
          { title: "Riya Birthday", date: "2022-01-01" },
          { title: "event 2", date: "2022-01-06" },
        ]}
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
                  <Button variant="primary">
                    Save
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleUpdateEvent}>
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
