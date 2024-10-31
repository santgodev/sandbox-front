import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: [
      { title: 'event 1', date: '2024-10-10' },
      { title: 'event 2', date: '2024-10-10' },
      { title: 'event 3', date: '2024-10-10' },
      { title: 'event 4', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }
}
