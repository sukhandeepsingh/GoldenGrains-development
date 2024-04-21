import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { AiOutlineDelete } from "react-icons/ai";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [deliveredOrder, setDeliveredOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [bankInfo, setBankInfo] = useState({
    bankHolderName: "",
    bankName: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankAddress: "",
    bankCountry: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));

    // const orderData =
    //   orders && orders.filter((item) => item.status === "Delivered");
    // setDeliveredOrder(orderData);
  }, [dispatch]);

  // const totalEarningWithoutTax =
  //   deliveredOrder &&
  //   deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  // const serviceCharge = totalEarningWithoutTax * 0.1;
  // const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankHolderName: bankInfo.bankHolderName,
      bankName: bankInfo.bankName,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankAddress: bankInfo.bankAddress,
      bankCountry: bankInfo.bankCountry,
    };

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Payment method saved");
        setBankInfo({
          bankHolderName: "",
          bankName: "",
          bankSwiftCode: null,
          bankAccountNumber: null,
          bankAddress: "",
          bankCountry: "",
        });
        setPaymentMethod(false);
        dispatch(loadSeller());
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Deleted");
        dispatch(loadSeller());
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 100 || withdrawAmount > availableBalance) {
      toast.error("enter valid amount");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw request made. You will rceive the forfirmation mail for it soon.");
          setOpen(false);
          dispatch(loadSeller());
        });
    }
  };

  const error = () => {
    toast.error("Min Rs. 100 required to withdraw.");
  };

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available balance: Rs. {availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !bg-[#279736] !rounded-[4px] !h-[42px]`}
          onClick={() => (availableBalance < 100 ? error() : setOpen(true))}
        >
          Withdraw now
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "min-h-[80vh] overflow-y-scroll" : null
            } min-h-[40vh] p-4`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>

            {paymentMethod ? (
              <div>
                <h3 className="text-[20px] font-Poppins text-center">
                  Add a payment method:
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="pt-2">
                    <label>
                      Name on Bank Account{" "}
                      <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      placeholder="enter the name on your bank account"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Name of the Bank <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="enter the name of your bank"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Swift Code <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="enter the swift code of bank"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Account number{" "}
                      <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="enter the number of your bank account"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank address <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="enter the address of bank"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="enter the country in which bank is situated"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} !bg-[#279736] !rounded-[4px] !h-[42px] text-[#fff] mb-3`}
                  >
                    Save
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-Poppins">Available methods:</h3>
                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4>Available Balance: Rs. {availableBalance}</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[150px] h-[40px] w-[full] border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} !h-[40px] !bg-[#279736] !w-auto !rounded-[4px] text-white`}
                        onClick={withdrawHandler}
                      >
                        <span className="px-2">Request Withdraw</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[17px] pt-2">
                      You have not saved any payment methods.
                    </p>
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`${styles.button} text-[#fff] mt-5 !bg-[#279736] !rounded-[4px] !h-[42px] !w-auto`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        <span className="px-2 text-center">
                          Add a payment method
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
