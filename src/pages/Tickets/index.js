import { useState, useEffect } from "react";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate, Link } from "react-router-dom";
import PN from "persian-number";
import { FileInput } from "./FileInput";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";
import moment from "jalali-moment";

const Tickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    getTickets();
    window.scrollTo(0, 0);
  }, []);

  async function getTickets() {
    setLoading(true);
    try {
      await axiosInstance
        .get("/tickets")
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setTickets(response.data.tickets);
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

  function singleOrder(order, idx, isLast) {
    return (
      <Link
        to={`/profile/ticket/${order.id}`}
        key={idx}
        className={`w-100 flex flex-col max-md:mx-3 mb-10 shadow rounded-lg bg-white dark:bg-gray-900`}
      >
        <div className={`flex flex-row gap-4`}>
          <div className="flex flex-col gap-2 w-full">
            <div
              className={`flex !bg-[#00796a]/20 !text-[#203d3f] rounded-t-lg flex-row justify-between user-drag-touch-none p-3 md:mt-0`}
            >
              <div className="flex flex-col gap-1">
                {/* <small className="text-sm">شماره تیکت</small> */}
                <span className="text-sm font-semibold">#{order.id}</span>
              </div>
              <div className="flex flex-col text-end gap-1">
                {/* <small className="text-sm">تاریخ ایجاد</small> */}
                <span className="text-sm font-semibold">
                  {moment(order.created_at)
                    .locale("fa")
                    .format("DD MMMM YYYY | HH:mm")}
                </span>
              </div>
            </div>
            <div className="flex flex-col px-3 gap-1 mb-4 max-[350px]:items-start w-full justify-between items-center">
              <div className="flex w-full mt-2 flex-row gap-2 justify-between !text-[#203d3f] items-center cursor-pointer rounded-md transition-all">
                <div className="flex flex-col gap-1">
                  <small className="text-sm">عنوان</small>
                  <div>
                    <span className="text-base font-semibold">
                      {order.title}
                    </span>
                    {/* {order.categories.map((c, idx) => (
                      <div
                        key={idx}
                        className="badge text-sm font-light rounded-lg p-1 mr-1 bg-[#00796a]/5 text-[#00796a]"
                      >
                        {c.name}
                      </div>
                    ))} */}
                    {order.status == "closed" && (
                      <div className="badge text-sm font-light rounded-lg p-1 mr-1 bg-[#ff0000]/5 text-[#ff0000]">
                        بسته
                      </div>
                    )}
                    {order.status == "open" &&
                      order.messages.length > 0 &&
                      order.messages[order.messages.length - 1].user_id ==
                        order.user_id && (
                        <div className="badge text-sm font-light rounded-lg p-1 mr-1 bg-[#00796a]/5 text-[#00796a]">
                          در حال بررسی
                        </div>
                      )}

                    {order.status == "open" &&
                      order.messages.length > 0 &&
                      order.messages[order.messages.length - 1].user_id !=
                        order.user_id && (
                        <div className="badge text-sm font-light rounded-lg p-1 mr-1 bg-[#00796a]/5 text-[#00796a]">
                          پاسخ پشتیبان
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-row items-">
                  <button className="btn btn-sm px-3 gap-1 !text-[#00796a] !border-[#00796a] border-1 text-sm text-medium items-center">
                    مشاهده
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {order.statusCode == 1 && (
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
        )} */}
      </Link>
    );
  }
  return (
    <>
      <div className=" w-full">
        <div className="mx-auto max-w-6xl w-full p-3 xl:px-1 flex justify-between items-center rounded-lg my-3 md:my-4">
          <h2 className="card-title">تیکت‌های پشتیبانی</h2>
          {loading == true ? (
            <span className="loading loading-dots w-7 !text-[#00796a]"></span>
          ) : (
            <Link
              to="/profile/ticket/new"
              className="btn btn-sm px-3 gap-1 !bg-[#00796a] text-white border-none text-base text-bold items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              تیکت جدید
            </Link>
          )}
        </div>

        {tickets.length > 0 ? (
          <div className="mt-3 mb-32">
            {tickets.map((order, idx) =>
              singleOrder(order, idx, tickets.length == idx + 1)
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
                    تاکنون تیکت پشتیبانی برای شما ثبت نشده است!
                  </h2>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Tickets;
