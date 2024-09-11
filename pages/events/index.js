import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";
import { getAllEvents } from "../../utils/api-util";

function AllEventsPage({allEvents}) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler}></EventSearch>
      <EventList items={allEvents}></EventList>
    </div>
  );
}

export async function getStaticProps(context) {
  const allEvents = await getAllEvents()
  return {
    props: {
      allEvents
    },
    revalidate: 60
  }
}

export default AllEventsPage;
