import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../utils/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/EventSummary";
import EventContent from "../../components/event-detail/EventContent";
import EventLogistics from "../../components/event-detail/EventLogistics";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        imageAlt={event.title}
        address={event.location}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const event = await getEventById(params.eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default EventDetailPage;
