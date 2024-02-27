import { Duration, CalendarEvent } from './types';

class Calendar {
  private events: CalendarEvent[] = [];

  createEvent(start: Date, duration: Duration, title: string, allowOverlap = false): CalendarEvent {
    const newEvent: CalendarEvent = { id: Math.random().toString(36).substr(2, 9), start, duration, title };

    if (!allowOverlap && this.events.some(event => this.isOverlap(event, newEvent))) {
      throw new Error("Event overlaps with existing event");
    }

    this.events.push(newEvent);
    return newEvent;
  }

  listEvents(startDate: Date, endDate: Date): CalendarEvent[] {
    return this.events.filter(event => event.start >= startDate && event.start <= endDate);
  }

  updateEvent(id: string, start: Date, duration: Duration, title: string, allowOverlap = false): CalendarEvent | string {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) return "Event not found";

    const updatedEvent: CalendarEvent = { id, start, duration, title };

    if (!allowOverlap && this.events.some((event, index) => index !== eventIndex && this.isOverlap(event, updatedEvent))) {
        throw new Error("Event overlaps with existing event");
    }

    this.events[eventIndex] = updatedEvent;
    return updatedEvent;
  }

  deleteEvent(id: string): boolean {
    const initialLength = this.events.length;
    this.events = this.events.filter(event => event.id !== id);
    return this.events.length !== initialLength;
  }

  private isOverlap(event1: CalendarEvent, event2: CalendarEvent): boolean {
    return (
      (event1.start >= event2.start && event1.start <= event2.duration.end) ||
      (event2.start >= event1.start && event2.start <= event1.duration.end)
    );
  }
}

export default Calendar;
