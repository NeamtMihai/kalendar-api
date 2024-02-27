import Calendar from './calendarAPI';

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
});
