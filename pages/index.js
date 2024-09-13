import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of great•events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
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
    revalidate: 30,
  };
}

export default HomePage;
