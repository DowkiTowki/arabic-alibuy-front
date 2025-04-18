import { useState, useEffect } from "react";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate } from "react-router-dom";
import PN from "persian-number";
import { FileInput } from "./FileInput";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [imgUrl, imgUploaded] = useState(null);
  const [images, setImages] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [paymentReceiptData, setPaymentReceiptData] = useState({
    orderId: "",
    total: "",
  });

  const codeOnClick = (data, title) => {
    navigator.clipboard.writeText(data);
    toast.success(`"${title}" در حافظه دستگاه کپی شد.`);
  };

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
    window.scrollTo(0, 0);
  }, []);


  const acc = {
    card: "5022291564633517",
    num: "777.888.12378055.1",
    ir: "300570077700007669001001",
    name: "فرید بینش پژوه",
    bank: "بانک پاسارگاد",
  };
  async function getOrders() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/userOrders")
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setOrders(response.data.orders);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // console.error("Error fetching Data:", error);
        });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  async function uploadPaymentReceipt() {
    setUploadLoading(true);

    try {
      await axiosInstance
        .post("/updateOrder", {
          receipt: imgUrl,
          orderId: paymentReceiptData.orderId,
        })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setOrders(response.data.orders);
            document.getElementById("paymentReceiptDialog").close();
            toast.success("رسید پرداخت با موفقیت بارگذاری شد.");
            imgUploaded(null);
            setImages([]);
            setPaymentReceiptData({ orderId: "", total: "" });
          }

          setUploadLoading(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // console.error("Error fetching Data:", error);
        });
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const items = [
    [
      { title: "مجموع سفارش", value: 18000000 },
      { title: "تخفیف", value: 0, primaryColor: true },
      { title: "مجموع سفارش با کسر تخفیف", value: 18000000 },
      { title: "مالیات‌ بر ارزش‌افزوده", value: 0 },
    ],
    [
      { title: " هزینه ارسال به ایران", value: "free", primaryColor: true },
      { title: " هزینه پست", value: 49000 },
    ],
    [{ title: "قابل پرداخت", value: 18049000, bold: true, primaryColor: true }],
  ];
  function singleOrder(order, idx, isLast) {
    return (
      <div
        className={`w-100 flex flex-col max-md:mx-3 mb-10 shadow rounded-lg bg-white dark:bg-gray-900`}
      >
        <div className={`flex flex-row gap-4`}>
          <div className="flex flex-col gap-3 w-full">
            <div
              className={`flex !bg-[#00796a]/20 !text-[#203d3f] rounded-t-lg flex-row justify-between user-drag-touch-none p-3 md:mt-0`}
            >
              <div className="flex flex-col gap-1">
                <small className="text-sm">شماره سفارش</small>
                <span className="text-base font-semibold">#{order.id}</span>
              </div>
              <div className="flex flex-col text-end gap-1">
                <small className="text-sm">وضعیت</small>
                <span className="text-base font-semibold">{order.status}</span>
              </div>
            </div>
            <div className="flex flex-col px-3 gap-1 mb-4 max-[350px]:items-start w-full justify-between items-center">
              {order.items.map((p, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 w-full border-b pb-4"
                >
                  <div
                    className={`font-medium text-base user-drag-touch-none mt-1 md:mt-0`}
                  >
                    {p.title}
                    {/* <br /> */}
                    <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap items-center gap-1 mb-2">
      
                    {p.subTitle && JSON.parse(p.subTitle).map((tag, idx) => (
                      <div
                        key={idx}
                        className={`badge bg-[#00796a]/5 text-[#00796a] font-light pt-[0.15rem]`}
                      >
                        {tag}
                      </div>
                    ))}
                    </div>
                  </div>
                  <div
                    className={`flex flex-col-reverse gap-1 min-[350px]:gap-0 min-[350px]:flex-row max-[350px]:items-start w-full justify-between items-center`}
                  >
                    <div className="text-sm font-semibold !text-[#203d3f] !bg-[#00796a]/20 py-1 px-3 rounded-lg">
                      X{p.qty}
                    </div>

                    <div className="flex flex-col gap-1 -mt-1- justify-end max-[350px]:w-full max-[350px]:justify-end">
                      <b className="text-end text-sm">
                        {PN.convertEnToPe(PN.sliceNumber(p.price))}{" "}
                        <small>ر.س</small>
                      </b>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex w-full mt-2 flex-row font-semibold justify-between !text-[#203d3f] items-center rounded-md transition-all">
                <p>مجموع فاکتور</p>
                <div className="flex flex-row items-center">
                  <span>
                    {PN.convertEnToPe(PN.sliceNumber(order.total_amount))}
                  </span>
                  <small className="mr-1">ر.س</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {order.statusCode == 1 && (
          <div className="w-full border-t pt-3">
            <div className="flex justify-between mx-0 rounded-lg bg-white dark:bg-gray-900 px-3 pb-3">
              <button
                className="btn !bg-[#00796a] border-none text-base text-bold text-white w-full items-center px-0"
                onClick={() => {
                  setPaymentReceiptData({
                    orderId: order.id,
                    total: order.total_amount,
                  });
                  document.getElementById("paymentReceiptDialog").showModal();
                }}
              >
                ثبت رسید پرداخت
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <>
      <div className=" w-full">
        <div className="mx-auto max-w-6xl w-full p-3 xl:px-1 flex justify-between items-center rounded-lg my-3 md:my-4">
          <h2 className="card-title">سفارشات</h2>
          {loading == true && (
            <span className="loading loading-dots w-7 !text-[#00796a]"></span>
          )}
        </div>

        {orders.length > 0 ? (
          <div className="mt-3 mb-32">
            {orders.map((order, idx) =>
              singleOrder(order, idx, orders.length == idx + 1)
            )}
          </div>
        ) : (
          <>
            {!loading && (
              <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 p-3 md:px-4">
                <div className="w-100 flex flex-col pt-4 pb-3">
                  <h2
                    className={`font-semibold text-center text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
                  >
                    تاکنون سفارشی ثبت نکرده‌اید!
                  </h2>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <dialog
        id="paymentReceiptDialog"
        className="modal modal-bottom md:modal-middle"
      >
        <div className="modal-box bg-white relative overflow-hidden max-h-[calc(100vh-5rem)]">
          <div className="sticky top-0 left-0 right-0 bg-white z-10 border-b pb-3">
            <form method="dialog">
              <button
                disabled={uploadLoading}
                className="btn btn-sm btn-circle bg-gray-200 hover:bg-gray-300 border-0 absolute right-0 top-0"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mr-10">ثبت رسید پرداخت</h3>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-10rem)] px-1 pt-6 pb-40 ">
            <div
              className={`flex !text-[#203d3f] flex-col justify-between gap-3`}
            >
              <div className="flex flex-col gap-1 !bg-[#00796a]/20 rounded-lg py-3">
                <div className="flex flex-row justify-between px-3 gap-1">
                  <small className="text-sm">شماره سفارش</small>
                  <span className="font-semibold">
                    #{paymentReceiptData.orderId}
                  </span>
                </div>
                <div className="flex flex-row justify-between px-3 text-base gap-1">
                  <small className="text-sm">مجموع فاکتور</small>
                  <b className="font-semibold">
                    {PN.convertEnToPe(PN.sliceNumber(paymentReceiptData.total))}{" "}
                    <small>ر.س</small>
                  </b>
                </div>
              </div>
              <div className="flex flex-col gap-2 !bg-[#00796a]/20 rounded-lg py-3">
                <div className="flex flex-row justify-between px-3 gap-1">
                  <small className="text-sm">
                    مجموع فاکتور را به شماره کارت/حساب زیر واریز کرده و تصویر
                    رسید پرداخت را بارگذاری نمایید.
                  </small>
                </div>
                <div className="flex flex-col justify-between px-3 text-base gap-1">
                  <small className="text-sm">شماره کارت</small>
                  <div className="flex gap-2 items-center mr-auto">
                    <b
                      onClick={() => codeOnClick(acc.card, "شماره کارت")}
                      className="font-semibold"
                      style={{ direction: "ltr" }}
                    >
                      {PN.convertEnToPe(acc.card)}{" "}
                    </b>
                    <button
                      className="btn btn-sm px-2 !h-7 !min-h-7 join-item  border-0 !bg-[#00796a]/20"
                      onClick={() => codeOnClick(acc.card, "شماره کارت")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-700 dark:text-gray-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      کپی
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between px-3 text-base gap-1">
                  <small className="text-sm">شماره شبا</small>
                  <div className="flex gap-2 items-center mr-auto">
                    <b
                      onClick={() => codeOnClick("IR" + acc.ir, "شماره شبا")}
                      className="font-semibold"
                      style={{ direction: "ltr" }}
                    >
                      {PN.convertEnToPe("IR" + acc.ir)}{" "}
                    </b>
                    <button
                      className="btn btn-sm px-2 !h-7 !min-h-7 join-item border-0 !bg-[#00796a]/20"
                      onClick={() => codeOnClick("IR" + acc.ir, "شماره شبا")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-700 dark:text-gray-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      کپی
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between px-3 text-base gap-1">
                  <small className="text-sm">شماره حساب</small>
                  <div className="flex gap-2 items-center mr-auto">
                    <b
                      onClick={() => codeOnClick(acc.num, "شماره حساب")}
                      className="font-semibold"
                      style={{ direction: "ltr" }}
                    >
                      {PN.convertEnToPe(acc.num)}{" "}
                    </b>
                    <button
                      className="btn btn-sm px-2 !h-7 !min-h-7 join-item border-0 !bg-[#00796a]/20"
                      onClick={() => codeOnClick(acc.num, "شماره حساب")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-gray-700 dark:text-gray-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                        />
                      </svg>
                      کپی
                    </button>
                  </div>
                </div>{" "}
                <div className="flex flex-row justify-between px-3 text-base gap-1 mt-2">
                  <span>
                    <small>به نام </small>{" "}
                    <b className="font-semibold">{acc.name}</b>
                  </span>
                  <b className="font-semibold">{acc.bank}</b>
                </div>{" "}
              </div>
              <FileInput
                images={images}
                setImages={setImages}
                imgUploaded={imgUploaded}
              />
            </div>

            <div></div>
          </div>
        </div>

        <div className="fixed bottom-0  w-full z-2 md:max-w-[512px] mx-auto bg-white dark:bg-gray-950 border-t-2  border-gray-300 rounded-t-2xl">
          <div className="flex justify-between m-3">
            <button
              // disabled={uploadLoading}
              className="btn !bg-[#00796a] disabled:!opacity-60 border-none text-base text-bold !text-white w-full shadow-xl items-center justify-between px-5"
              onClick={() => {
                uploadPaymentReceipt();
              }}
            >
              {uploadLoading == true ? (
                <>
                  در حال بارگذاری
                  <span className="loading loading-dots loading-lg mt-1"></span>
                </>
              ) : (
                <>
                  تایید و بارگذاری
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>
    </>
  );
};

export default Orders;
