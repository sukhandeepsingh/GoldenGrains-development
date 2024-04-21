import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { server } from "../../server";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [openDelete, setOpenDelete] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllUsers());
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      type: "text",
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "details",
      flex: 0.4,
      minWidth: 50,
      headerName: "Details",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`?${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      flex: 0.4,
      minWidth: 50,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpenDelete(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  users &&
    users.forEach((item) => {
      row.push({
        id: item?._id,
        name: item?.name,
        email: item?.email,
        role: item?.role,
        joinedAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full justify-center p-4">
      <h3 className="text-[22px] font-Poppins pb-2">
        All users Registered on platform
      </h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={15}
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
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpenDelete(false) || handleDelete(userId)}
                >
                  Confirm Delete
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
