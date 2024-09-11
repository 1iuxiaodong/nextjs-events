import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils/api-util";

function HomePage({ events }) {
  return (
    <div>
      <EventList items={events}></EventList>
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 30
  };
}

export default HomePage;
