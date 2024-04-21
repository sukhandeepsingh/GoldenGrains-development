import React, { useEffect } from "react";
import styles from "../../styles/styles";
import EventCard from "../EventCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  // useEffect(() => {
  //   const data = allEvents && allEvents.find((a,b) => a.sold_out - b.sold_out);
  //   console.log(data);
  // }, [allEvents])

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid mb-4">
            {allEvents.length !== 0 ? (
              <EventCard data={allEvents && allEvents[0]} />
            ) : (
              <>
                <div className="md-3 text-[18px] text-center w-full bg-[#fff] rounded-md min-h-[100px]">
                  <div className="w-full my-[25px]">
                    <h4>
                      There are currently no events running on the website. But
                      many are on the way...
                    </h4>
                    <h4>
                      Until then, check out our{" "}
                      <Link to="/products" className="text-[#279736] hover:underline">
                        products catalogue
                      </Link>
                      .
                    </h4>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
