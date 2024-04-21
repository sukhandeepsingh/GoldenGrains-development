import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { GiFarmer, GiReceiveMoney, GiWheat } from "react-icons/gi";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardContents = () => {
  const dispatch = useDispatch();

  const { adminOrders, isLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  const platformFeeTotal = adminOrders && adminOrders.reduce((acc,item) => acc + item.totalPrice * 0.05, 0);
  const adminTotalBalance = platformFeeTotal?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.4,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        type: "number",
        minWidth: 100,
        flex: 0.4,
      },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: " ",
      flex: 0.5,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "Rs. " + item.totalPrice,
        status: item.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <GiReceiveMoney size={30} className="mr-2" fill="#222" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#222]`}
                >
                  Total Balance{" "}
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                Rs. {adminTotalBalance}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <GiFarmer size={30} className="mr-2" fill="#222" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#222]`}
                >
                  All Farmers
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers?.length}</h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#279736]">View all Farmers</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <GiWheat size={30} className="mr-2" fill="#222" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#222]`}
                >
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {adminOrders && adminOrders?.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#279736]">View all Orders</h5>
              </Link>
            </div>
          </div>

          <br />

          <h3 className="text-[22px] font-Poppins pb-2">
            Latest Orders on platform
          </h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardContents;
