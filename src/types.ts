type Duration = {
    start: Date;
    end: Date;
  };
  
  type CalendarEvent = {
    id: string;
    start: Date;
    duration: Duration;
    title: string;
  };
  
  export { Duration, CalendarEvent };
  