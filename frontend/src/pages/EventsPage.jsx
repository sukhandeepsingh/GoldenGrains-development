import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/EventCard";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const xx = useSelector((state) => state.events.allEvents);

  return (
    <div>
      <Header activeHeading={4} />
      {xx &&
        xx.map((items, i) => (
          <>
            <EventCard active={true} data={items} key={i} />
            <br />
          </>
        ))}
    </div>
  );
};

export default EventsPage;
