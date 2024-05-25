import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import EventCard from "../components/EventCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const xx = useSelector((state) => state.events.allEvents);

  return (
    <>
      <div>
        <Header activeHeading={4} />
        <div className="w-full flex justify-center">
          <div className="w-11/12 block justify-center">
            {xx?.length !== 0 ? (
              xx &&
              xx.map((items, i) => (
                <>
                  <EventCard active={true} data={items} key={i} />
                  <br />
                </>
              ))
            ) : (
              <>
                <div className="md-3 text-[18px] text-center w-full bg-[#fff] flex justify-between items-center rounded-md min-h-[100px]">
                  <div className="w-full my-[25px]">
                    <h4>
                      There are currently no events running on the website. But
                      many are on the way...
                    </h4>
                    <h4>
                      Until then, check out our{" "}
                      <Link
                        to="/products"
                        className="text-[#279736] hover:underline"
                      >
                        products catalogue
                      </Link>
                      .
                    </h4>
                  </div>
                </div>
                <br />
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
