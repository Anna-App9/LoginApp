import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default class Schedule extends Component {
  // declare any necessary functions such as handleDateClick, etc.

  render() {
    return <FullCalendar 
                    defaultView="dayGridMonth" 
                    plugins={[dayGridPlugin, interactionPlugin]}
                    editable={true}
                    eventDrop={this.handleEventDrop}
                    eventClick={this.handleEventClick}
                    // events={this.formatEvents()}
                />
  }
}