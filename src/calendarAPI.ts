import { Duration, CalendarEvent, RecurrenceRule } from './types';

class Calendar {
  private events: CalendarEvent[] = [];
  private recurringEvents: CalendarEvent[] = [];


  createEvent(start: Date, duration: Duration, title: string, allowOverlap = false): CalendarEvent {
    const newEvent: CalendarEvent = { id: Math.random().toString(36).substr(2, 9), start, duration, title };

    if (!allowOverlap && this.events.some(event => this.isOverlap(event, newEvent))) {
      throw new Error("Event overlaps with existing event");
    }

    this.events.push(newEvent);
    return newEvent;
  }

  listEvents(startDate: Date, endDate: Date): CalendarEvent[] {
    const eventsInRange = this.events.filter(event => event.start >= startDate && event.start <= endDate);
    const recurringEventsInRange = this.getRecurringEventsInRange(startDate, endDate);
    return [...eventsInRange, ...recurringEventsInRange];
  }

  createRecurringEvent(start: Date, duration: Duration, title: string, rule: RecurrenceRule): CalendarEvent | string {
    const newRecurringEvent: CalendarEvent = { id: Math.random().toString(36).substr(2, 9), start, duration, title };

    // Apply recurrence rule and add recurring events
    this.applyRecurrenceRule(newRecurringEvent, rule);
    this.recurringEvents.push(newRecurringEvent);
    
    return newRecurringEvent;
  }

  private getRecurringDatesInRange(event: CalendarEvent, startDate: Date, endDate: Date): CalendarEvent[] {
    if(!event.recurrenceRule){
      return [];
    }
    const recurringDates: CalendarEvent[] = [];
    const currentDate = event.start;

    while (currentDate <= endDate) {
      if (currentDate >= startDate) {
        recurringDates.push({ ...event, start: new Date(currentDate) });
      }

      // Apply recurrence rule to calculate next occurrence
      currentDate.setDate(currentDate.getDate() + event.recurrenceRule.interval);
      switch (event.recurrenceRule.frequency) {
        case 'daily':
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + (7 * event.recurrenceRule.interval));
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + event.recurrenceRule.interval);
          break;
      }
    }

    return recurringDates;
  }

  private applyRecurrenceRule(event: CalendarEvent, rule: RecurrenceRule): void {
    event.recurrenceRule = rule;
  }

  private getRecurringEventsInRange(startDate: Date, endDate: Date): CalendarEvent[] {
    return this.recurringEvents.reduce((acc: CalendarEvent[], event: CalendarEvent) => {
      const recurringDates = this.getRecurringDatesInRange(event, startDate, endDate);
      return [...acc, ...recurringDates];
    }, []);
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

  updateRecurringEventRule(eventId: string, newRule: RecurrenceRule): CalendarEvent {
    const eventIndex = this.recurringEvents.findIndex(event => event.id === eventId);
    if (eventIndex === -1) throw new Error("Recurring event not found");

    const updatedEvent = { ...this.recurringEvents[eventIndex], recurrenceRule: newRule };
    this.recurringEvents[eventIndex] = updatedEvent;

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
