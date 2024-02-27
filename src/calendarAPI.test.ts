import Calendar from './calendarAPI';
import { RecurrenceRule } from './types';

describe('Calendar API', () => {
  let calendar: Calendar;

  beforeEach(() => {
    calendar = new Calendar();
  });

  test('Create event', () => {
    const event = calendar.createEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Test Event');
    expect(event).toBeTruthy();
  });

  test('List events', () => {
    calendar.createEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Test Event');
    const events = calendar.listEvents(new Date(2024, 1, 1), new Date(2024, 1, 3));
    expect(events.length).toBe(1);
  });

  test('Update event', () => {
    const event = calendar.createEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Test Event');
    const updatedEvent = calendar.updateEvent(event.id, new Date(2024, 1, 3), { start: new Date(2024, 1, 3), end: new Date(2024, 1, 4) }, 'Updated Event');
    expect(updatedEvent).toBeTruthy();
  });

  test('Delete event', () => {
    const event = calendar.createEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Test Event');
    const result = calendar.deleteEvent(event.id);
    expect(result).toBeTruthy();
  });

  test('Create recurring event', () => {
    const rule: RecurrenceRule = { frequency: 'weekly', interval: 1 };
    const recurringEvent = calendar.createRecurringEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Weekly Event', rule);
    expect(recurringEvent).toBeTruthy();
  });

  test('Update recurring event rule', () => {
    const rule: RecurrenceRule = { frequency: 'weekly', interval: 1 };
    const recurringEvent = calendar.createRecurringEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Weekly Event', rule);

    const updatedRule: RecurrenceRule = { frequency: 'monthly', interval: 2 };
    const updatedEvent = calendar.updateRecurringEventRule(recurringEvent.id, updatedRule);
    expect(updatedEvent).toBeTruthy();
  });

  test('List recurring events', () => {
    const rule: RecurrenceRule = { frequency: 'weekly', interval: 1 };
    calendar.createRecurringEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Weekly Event', rule);

    const events = calendar.listEvents(new Date(2024, 1, 1), new Date(2024, 1, 14));
    expect(events.length).toBeGreaterThan(1); // At least one recurring event should be listed
  });

  test('Delete recurring event', () => {
    const rule: RecurrenceRule = { frequency: 'weekly', interval: 1 };
    const recurringEvent = calendar.createRecurringEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Weekly Event', rule);

    const result = calendar.deleteEvent(recurringEvent.id);
    expect(result).toBeTruthy();
  });
});
