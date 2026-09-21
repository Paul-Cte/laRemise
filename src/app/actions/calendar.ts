"use server";

export async function getBookedDates() {
  const url = "https://www.airbnb.fr/calendar/ical/31368119.ics?t=e8b8ba3100954fb2a5a46b7a251ca05e";
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const text = await res.text();
    
    const lines = text.split(/\r?\n/);
    const bookedDates = [];
    let currentEvent: { start?: string; end?: string } | null = null;
    
    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        currentEvent = {};
      } else if (line.startsWith('END:VEVENT')) {
        if (currentEvent && currentEvent.start && currentEvent.end) {
          bookedDates.push({ start: currentEvent.start, end: currentEvent.end });
        }
        currentEvent = null;
      } else if (currentEvent) {
        if (line.startsWith('DTSTART')) {
          const match = line.match(/:(\d{4})(\d{2})(\d{2})/);
          if (match) currentEvent.start = `${match[1]}-${match[2]}-${match[3]}`;
        } else if (line.startsWith('DTEND')) {
          const match = line.match(/:(\d{4})(\d{2})(\d{2})/);
          if (match) currentEvent.end = `${match[1]}-${match[2]}-${match[3]}`;
        }
      }
    }
    return bookedDates;
  } catch (err) {
    console.error("Failed to fetch calendar", err);
    return [];
  }
}
