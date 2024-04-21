import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { DataGrid } from "@material-ui/data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AdminWithdrawRequests = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/admin-all-withdraw-requests`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, [data]);

  console.log(data);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Farmer Name",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "shopId",
      headerName: "Farmer shop Id",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "text",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      type: "text",
      minWidth: 50,
      flex: 0.5,
    },
    {
      field: "",
      flex: 0.5,
      minWidth: 40,
      headerName: "Update Status",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={`${params.row.status !== "Processing" ? 'hidden' : '' } mr-2 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.seller?.name,
        shopId: item?.seller?._id,
        amount: "Rs. " + item?.amount,
        status: item?.status,
        createdAt: item?.createdAt?.slice(0, 10),
      });
    });

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/admin-update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Updated successfully");
        setData(res.data.withdraws);
        setOpen(false);
      });
  };

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="flex justify-end w-full cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h1 className="text-[25px] text-center font-Poppins">
              Update status of farmer's withdraw request
            </h1>
            <br />
            <select
              name=""
              id=""
              onChange={(e) => setWithdrawStatus(e.target.value)}
              className="w-[200px] h-[35px] border rounded"
            >
              <option value={withdrawStatus}>{withdrawData.status}</option>
              <option value={withdrawStatus}>success</option>
            </select>
            <button
              type="submit"
              className={`block ${styles.button} text-white !bg-[#279736] !rounded-[4px] !h-[42px] mt-4 text-[18px]`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawRequests;
