import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import EventCard from "../components/EventCard";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const xx = useSelector((state) => state.events.allEvents);

  return (
    <>
      <div>
        <Header activeHeading={4} />
        <div className="w-full flex justify-center">
          <div className="w-11/12 block justify-center">
            {xx &&
              xx.map((items, i) => (
                <>
                  <EventCard active={true} data={items} key={i} />
                  <br />
                </>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
