export async function getAllEvents() {
  const res = await fetch(
    "https://nextjs-events-df653-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await res.json();
  const events = [];
  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }
  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  const events = allEvents.filter((event) => event.isFeatured);
  return events;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const DUMMY_EVENTS = await getAllEvents();
  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
