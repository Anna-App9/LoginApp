import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';



export default class DemoApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    weekendsVisible: true,
    currentEvents: [],
    isEdit:false,
    show: false,
    title:'',
  }
}
  handleShow = () => {
    this.setState({show:true});
  }
  onChangeTitle = (e) =>{
    this.setState({title:e.target.value})
  }
  handleAddEvent=()=>{
    this.setState({isEdit:false});
  }

  handleUpdateEvent=()=>{

  }


  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {

    const {show} = this.state.show;

    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            Show weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
          {/* <Button variant="primary" onClick={() => this.state({show:true})}> */}
          <Button variant="primary" onClick={this.handleShow}>
            +
      </Button>      
      <>
      {this.state.show && <Modal onHide={this.handleClose}>
      {/* <Modal show={this.state.show} onHide={this.handleClose}> */}
        <Modal.Header closeButton>
          <Modal.Title>{ !this.state.isEdit? "Create Event" : "Update Event" }</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, let's create a memorable event now!
        <form>
          <div className="mb-3">
            <label for="eventName" className="col-form-label">Event Title:</label>
            <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
          </div>
          <DatePicker placeholderText='Start Date' selected={this.state.start} onChange={this.onChangeStart}/>
          <DatePicker placeholderText='End Date' selected={this.state.end} onChange={this.onChangeEnd}/>
         
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <>
          {
            !this.state.isEdit?
          
          <Button variant="primary" onClick={this.handleAddEvent}>
            Save
          </Button>
 :  
          <Button variant="primary" onClick={this.handleUpdateEvent}>
            Update
          </Button>
}
          </>
        </Modal.Footer>
        </form>
        </Modal.Body>        
        </Modal>
  }
        </>
   
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleUpdateEvent=()=>{

  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' '${clickInfo.event.start}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{event.title}</b> <br></br>
      <i>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</i>

    </li>
  )
}