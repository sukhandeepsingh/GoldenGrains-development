import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllEventsShop } from "../../redux/actions/event";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const [openDelete, setOpenDelete] = useState(false);
  const [eventId, setEventId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/event/delete-shop-event/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllEventsShop(seller._id));
  }

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "Preview",
      flex: 0.3,
      minWidth: 40,
      headerName: "View",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        // const d = params.row.name;
        // const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${params?.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.3,
      minWidth: 40,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => { setEventId(params?.id) || setOpenDelete(true)}}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        price: "Rs. " + item?.discountPrice,
        Stock: item?.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {openDelete && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpenDelete(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this event from the platform?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !rounded-[4pt] !h-[30pt] mr-4`}
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !rounded-[4pt] !h-[30pt] ml-4`}
                  onClick={() => setOpenDelete(false) || handleDelete(eventId)}
                >
                  Confirm Delete
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      )}
    </>
  );
};

export default AllEvents;
