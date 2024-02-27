# Calendar API

A TypeScript library for managing calendar events.

## Installation

You can install the package via npm:

```bash
npm install calendar-api
```

## Usage

```typescript
import Calendar, { Duration, RecurrenceRule } from 'calendar-api';

// Create a new instance of the Calendar
const calendar = new Calendar();

// Create a simple event
const event1 = calendar.createEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Test Event');

// List events within a date range
const eventsInRange = calendar.listEvents(new Date(2024, 1, 1), new Date(2024, 1, 3));

// Create a recurring event
const rule: RecurrenceRule = { frequency: 'weekly', interval: 1 };
const recurringEvent = calendar.createRecurringEvent(new Date(2024, 1, 1), { start: new Date(2024, 1, 1), end: new Date(2024, 1, 2) }, 'Weekly Event', rule);

// Update recurrence rule of a recurring event
const updatedRule: RecurrenceRule = { frequency: 'monthly', interval: 2 };
calendar.updateRecurringEventRule(recurringEvent.id, updatedRule);

// Delete an event
calendar.deleteEvent(event1.id);
```

## API

### Calendar Methods

#### `createEvent(start: Date, duration: Duration, title: string, allowOverlap?: boolean): CalendarEvent | string`

Creates a new calendar event.

- `start`: Start date and time of the event.
- `duration`: Duration object containing start and end dates of the event.
- `title`: Title of the event.
- `allowOverlap`: Optional parameter to allow overlapping events. Defaults to `false`.

Returns the created event object or an error message if event creation fails due to overlapping.

#### `createRecurringEvent(start: Date, duration: Duration, title: string, rule: RecurrenceRule): CalendarEvent | string`

Creates a new recurring calendar event.

- `start`: Start date and time of the event.
- `duration`: Duration object containing start and end dates of the event.
- `title`: Title of the event.
- `rule`: Recurrence rule for the event.

Returns the created event object or an error message if event creation fails.

#### `updateRecurringEventRule(eventId: string, newRule: RecurrenceRule): CalendarEvent | string`

Updates the recurrence rule of a recurring event.

- `eventId`: ID of the recurring event to update.
- `newRule`: New recurrence rule for the event.

Returns the updated event object or an error message if the event is not found.

#### `listEvents(startDate: Date, endDate: Date): CalendarEvent[]`

Lists all events within the specified date range.

- `startDate`: Start date of the range.
- `endDate`: End date of the range.

Returns an array of events within the date range.
