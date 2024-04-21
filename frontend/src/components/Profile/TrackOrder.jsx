import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full min-h-[70vh] flex justify-center items-center">
      {data && data?.status === "Processing" ? (
        <h1 className="text-[20px]">
          The order is currently being processed by the farmer.
        </h1>
      ) : data?.status === "Transferred to delivery partner" ? (
        <h1 className="text-[20px]">
          The order is currently has been processed by the farmer and has been
          transferred to the delivery team. It will be shipped soon
        </h1>
      ) : data?.status === "Shipping" ? (
        <h1 className="text-[20px]">
          The order is currently being shipped by the delivery partner.
        </h1>
      ) : data?.status === "Received" ? (
        <h1 className="text-[20px]">
          The order has been received by the final delivery station.
        </h1>
      ) : data?.status === "On the way" ? (
        <h1 className="text-[20px]">
          The order is currently currently on the way to you by the delivery
          person. It will reach you by tonight.
        </h1>
      ) : data?.status === "Delivered" ? (
        <h1 className="text-[20px]">
          The order has been delivered on the given address.
        </h1>
      ) : data?.status === "Processing refund" ? (
        <h1 className="text-[20px]">
          Refund is being processed.
        </h1>
      ) : data?.status === "Refund Success" ? (
        <h1 className="text-[20px]">
          Refund has been processed successfully.
        </h1>
      ) : null}
    </div>
  );
};

export default TrackOrder;
