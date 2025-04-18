import { useState } from "react";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";

const Profile = () => {
  async function updateUser() {
    try {
      setLoading(true);
      await axiosInstance
        .post("/updateUser", {
          name: name != '' ? name : localStorage.getItem("userName"),
          email: email != '' ? email : localStorage.getItem("userEmail"),
        })
        .then((response) => {
          if (response.data.error == true) {
            // setOtpError(true);
            // setOtp("");
            toast.error(response.data.message);
          } else {
            localStorage.setItem("userEmail", response.data.data.email);
            localStorage.setItem("userName", response.data.data.name);
            // localStorage.setItem("userPhone",response.data.data.email);
            toast.success("اطلاعات شما بروزرسانی شد.");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // console.error("Error fetching Data:", error);
        });
    } catch (error) {
      throw error;
    }
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className=" w-full">
        <div className="mx-auto max-w-6xl w-full p-3 xl:px-1 flex justify-between items-center rounded-lg my-3 md:my-4">
          <h2 className="card-title">حساب کاربری</h2>
        </div>

        <div className="mt-3 mb-32 flex flex-col max-md:mx-3 shadow rounded-lg bg-white dark:bg-gray-900">
          <div className="px-3">
            <div className="label mt-4">
              <span className="label-text text-[#203d3f]">شماره موبایل</span>
            </div>
            <label
              className={`${
                nameError == true && "!border-red-600  "
              } input input-bordered sm:max-w-96 bg-opacity-20 !bg-gray-100 flex items-center mb-6 mt-1 gap-4`}
            >
              <input
                readOnly
                disabled
                // onChange={(e) => setName(e.target.value)}
                type="text"
                // min={11}
                // minLength={11}
                value={localStorage.getItem("userPhone")}
                className="grow text-left font-semibold  text-[#203d3f] placeholder-gray-500 pr-2"
                // placeholder=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 opacity-80"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </label>

            <div className="label mt-4">
              <span className="label-text text-[#203d3f]">
                نام و نام‌خانوادگی
              </span>
            </div>
            <label
              className={`${
                nameError == true && "!border-red-600  "
              } input input-bordered sm:max-w-96 bg-opacity-20 flex items-center mb-6 mt-1 gap-4`}
            >
              <input
                disabled={loading}
                onChange={(e) => setName(e.target.value)}
                type="text"
                // min={11}
                // minLength={11}
                className="grow text-right font-semibold text-[#203d3f] placeholder-gray-500 pr-2"
                // placeholder=""
                defaultValue={localStorage.getItem("userName")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 opacity-80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </label>

            <div className="label mt-4">
              <span className="label-text text-[#203d3f]">ایمیل</span>
            </div>
            <label
              className={`${
                nameError == true && "!border-red-600  "
              } input input-bordered sm:max-w-96 bg-opacity-20 flex items-center mb-6 mt-1 gap-4`}
            >
              <input
                disabled={loading}
                style={{ direction: "ltr" }}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                min={11}
                minLength={11}
                className="grow text-left font-semibold text-[#203d3f] placeholder-gray-500 pr-2"
                placeholder=""
                defaultValue={localStorage.getItem("userEmail")}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-4 opacity-80"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </label>

            <div className="flex justify-between mx-0 rounded-lg bg-white dark:bg-gray-900 pb-3">
              <button
                disabled={loading}
                className="btn !bg-[#00796a] sm:max-w-96 border-none my-4 text-base text-bold text-white w-full items-center px-0"
                onClick={() => {
                  updateUser();
                  //   setPaymentReceiptData({
                  //     orderId: order.id,
                  //     total: order.total_amount,
                  //   });
                  //   document.getElementById("paymentReceiptDialog").showModal();
                }}
              >
                {loading ? (
                  <span className="loading loading-dots text-white  mt-1"></span>
                ) : (
                  <>تایید و ویرایش</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
