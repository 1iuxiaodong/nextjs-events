import { useRouter } from "next/router";
import { getFilteredEvents } from "../../utils/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultTitle";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";

function FilteredEventPage({ hasError, date, filteredEvents, noData }) {
  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (noData) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
}

export async function getServerSideProps({ params }) {
  const filterData = params.slug;

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      notFound: true,
      // redirect: {
      //   destination: "/error"
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        noData: true,
      },
    };
  }
  const date = new Date(numYear, numMonth - 1);
  return {
    props: {
      date: date.toISOString(),
      filteredEvents,
    },
  };
}

export default FilteredEventPage;
