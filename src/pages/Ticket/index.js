import { useState, useEffect } from "react";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import PN from "persian-number";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";
import moment from "jalali-moment";

const Ticket = () => {
  const { id } = useParams();
 const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");

  const [ticket, setTicket] = useState({});
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);
  const [priority, setPriority] = useState("NORMAL");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getTicket();
    window.scrollTo(0, 0);
  }, []);

  async function getTicket() {
    setLoading(true);
    try {
      await axiosInstance
        .get(`/tickets/${id}`)
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            if (id == "new") {
              setCategories(response.data.categories);
            } else {
              setTicket(response.data.ticket);
            }
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

  async function replyTicket() {
    if(replyMessage.length < 10){
      toast.error('پیام شما باید حداقل 10 کاراکتر باشد.');
    }else{
    setLoading(true);
    try {
      await axiosInstance
        .post(`/tickets/${id}/reply`, { message: replyMessage })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setTicket(response.data.ticket);
            toast.success(response.data.message);
            setReplyMessage("");
            document.getElementById("replyMessage").value = "";
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
  }

  async function newTicket() {
    
    if(title == null || title?.length < 3){
      toast.error('عنوان تیکت را بنویسید.');
      return;
    }
    if(category == null){
      toast.error('دسته بندی تیکت را انتخاب کنید');
      return;
    }
    if(replyMessage.length < 10){
      toast.error('پیام شما باید حداقل 10 کاراکتر باشد.');
      return;
    }
    setLoading(true);
    try {
      await axiosInstance
        .post(`/tickets`, {
          message: replyMessage,
          category: category,
          priority: priority,
          title: title,
        })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setTicket(response.data.ticket);
            toast.success(response.data.message);
            setReplyMessage("");
            document.getElementById("replyMessage").value = "";
            navigate('/profile/ticket/'+response.data.ticket.id);
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

  // async function uploadPaymentReceipt() {
  //   setUploadLoading(true);

  //   try {
  //     await axiosInstance
  //       .post("/updateOrder", {
  //         receipt: imgUrl,
  //         orderId: paymentReceiptData.orderId,
  //       })
  //       .then((response) => {
  //         if (response.data.error == true) {
  //           toast.error(response.data.message);
  //         } else {
  //           document.getElementById("paymentReceiptDialog").close();
  //           toast.success("رسید پرداخت با موفقیت بارگذاری شد.");
  //           imgUploaded(null);
  //           setPaymentReceiptData({ orderId: "", total: "" });
  //         }

  //         setUploadLoading(false);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         // console.error("Error fetching Data:", error);
  //       });
  //   } catch (error) {
  //     setLoading(false);
  //     throw error;
  //   }
  // }

  return (
    <>
      <div className="w-full">
        <div className="mx-auto max-w-6xl w-full p-3 xl:px-1 flex justify-between items-center rounded-lg my-3 md:my-4">
          <h2 className="card-title">
            {id == "new" ? "ایجاد تیکت جدید" : `تیکت‌ شماره ${id}#`}
          </h2>
          {/* {loading == true && ( */}
          <Link to="/profile/tickets" className="!text-[#00796a] flex">
            العودة
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          {/* )} */}
        </div>
        {id == "new" ? (
          <>
            <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 p-3 md:px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">عنوان</span>
                </div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="عنوان تیکت"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">دسته‌بندی</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled selected>
                    انتخاب دسته‌بندی
                  </option>
                  {categories.map(
                    (c) =>
                      c.is_visible == 1 && (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      )
                  )}
                </select>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">اولویت</span>
                </div>
                <select
                  className="select select-bordered"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="LOW">کم</option>
                  <option selected value="NORMAL">
                    متوسط
                  </option>
                  <option value="HIGH">زیاد</option>
                </select>
              </label>
            </div>
          </>
        ) : (
          <>
            {ticket.messages?.length > 0 ? (
              <div className="m-2 mb-40">
                {ticket.messages.map((t, idx) => (
                  <div key={t.id}
                    className={`chat mb-3 ${
                      t.user_id == ticket.user_id ? "chat-start" : "chat-end"
                    }`}
                  >
                    {t.user_id != ticket.user_id && (
                      <div className="chat-header font-bold text-[#00796a] ml-2 mb-1">
                        پشتیبانی SALA
                      </div>
                    )}

                    <div
                      className={`chat-bubble bg-[#00796a] ${
                        t.user_id == ticket.user_id
                          ? "bg-opacity-5"
                          : "bg-opacity-25"
                      }`}
                    >
                      {t.message}
                    </div>
                    <div className="chat-footer !text-xs opacity-70 mx-2 mt-1">
                      {moment(t.created_at)
                        .locale("fa")
                        .format("DD MMMM HH:mm")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {!loading && (
                  <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 p-3 md:px-4">
                    <div className="w-100 flex flex-col pt-4 pb-3">
                      <h2
                        className={`font-semibold text-center text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
                      >
                        هنوز پیامی در تیکت ارسال نشده!
                      </h2>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div className="fixed flex justify-between items-end bg-[#00796a] bg-opacity-30 gap-3 bottom-0 w-full md:max-w-[32rem] lg:max-w-[45rem] rounded-t-2xl p-5 max-md:!z-[100041]">
          <textarea
            id="replyMessage"
            onChange={(e) => setReplyMessage(e.target.value)}
            rows="3"
            className="textarea text-right w-full leading-5 bg-[rgb(239,245,245)]"
            placeholder="پیام خود را اینجا بنویسید."
          ></textarea>

          <button
            onClick={() => (id == "new" ? newTicket() : replyTicket())}
            className="btn max-md:btn-circle btn-outline border-[#00796a] bg-[#00796a] hover:!bg-[#00796a]/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-7 md:size-6 -rotate-45 mb-1 md:mb-2 ml-1 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            <span className="text-base text-white max-md:hidden"> ارسال</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Ticket;
