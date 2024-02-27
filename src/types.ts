type Duration = {
    start: Date;
    end: Date;
  };
  
  interface RecurrenceRule {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
  }

  type CalendarEvent = {
    id: string;
    start: Date;
    duration: Duration;
    title: string;
    recurrenceRule?: RecurrenceRule;
  };
  
  export { Duration, CalendarEvent, RecurrenceRule };
  