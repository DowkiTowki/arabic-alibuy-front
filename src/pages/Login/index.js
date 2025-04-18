import { Link } from "react-router-dom";
import { useState } from "react";
import { OtpInput } from "reactjs-otp-input";
import { IoLogoWhatsapp } from "react-icons/io";
import axiosInstance from "../../services/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTelegram } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const navigate = useNavigate();
  async function sendOtp() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/login/ar", { email: phone })
        .then((response) => {
          if (response.data.error == true) {
            setPhoneError(true);
            toast.error(response.data.message);
          } else {
            setShowVerify(true);
            if (response.data.isNewUser == true) {
              setIsNewUser(true);
            }
            toast.success(response.data.message);
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

  async function verifyOtp() {
    if (otp.length < 6) {
      setOtpError(true);
    } else {
      setOtpError(false);
    }
    if (isNewUser && name.length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (otpError == false && nameError == false) {
      setLoading(true);
      try {
        await axiosInstance
          .post("/login/ar", {
            type: "verify",
            email: phone,
            password: otp,
            name: name,
          })
          .then((response) => {
            if (response.data.error == true) {
              setOtpError(true);
              setOtp("");
              toast.error(response.data.message);
            } else {
              toast.success(response.data.message);
              localStorage.setItem("userToken", response.data.token);
              localStorage.setItem("userName", response.data.user.name);
              localStorage.setItem("userPhone", response.data.user.phone);
              localStorage.setItem("userEmail", response.data.user.email);

              window.location.href = localStorage.getItem("returnUrl") ?? "/";
              localStorage.removeItem("returnUrl");
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
  }
  function LoginComponent() {
    return (
      <div className="mt-10 w-full sm:w-[400px]">
        <div className="label">
          <span className="label-text text-[#203d3f]">
            للتسجيل أو الدخول، أدخل رقم هاتفك المحمول.
            {/* برای ثبت‌نام یا ورود شماره موبایل خود را وارد کنید. */}
          </span>
        </div>
        <label
          className={`${
            phoneError == true && "!border-red-600  "
          } input input-bordered  bg-opacity-20 flex items-center mt-1 gap-2`}
        >
          <input
            onChange={(e) => handlePhoneChange(e.target.value)}
            autoFocus
            type="email"
            dir="ltr"
            // max={11}
            // maxLength={11}
            className="grow text-left tracking-widest font-semibold text-[#203d3f] placeholder-gray-500 pl-2"
            placeholder="Email"
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
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>
        </label>
        <button
          onClick={() => sendOtp()}
          className={`btn !bg-[#00796a] !text-white w-full mt-8 text-base
            ${loading && "!cursor-not-allowed !bg-[#00796a]/50"}`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "تایید و متابعة"
          )}
        </button>
      </div>
    );
  }
  function VerifyComponent() {
    return (
      <div className="mt-10 w-full  sm:w-[400px]">
        {isNewUser == true && (
          <>
            <div className="label">
              <span className="label-text text-[#203d3f]">
                للتسجيل، يرجى إدخال اسمك واسم العائلة.
              </span>
            </div>
            <label
              className={`${
                nameError == true && "!border-red-600  "
              } input input-bordered  bg-opacity-20 flex items-center mb-6 mt-1 gap-2`}
            >
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="grow text-right font-semibold text-[#203d3f] placeholder-gray-500 pr-2"
                placeholder=""
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
          </>
        )}

        <div className="label">
          <span className="label-text text-[#203d3f]">
            كلمة السر
          </span>
        </div>

        <label
          className={`${
            nameError == true && "!border-red-600  "
          } input input-bordered  bg-opacity-20 flex items-center mb-6 mt-1 gap-2`}
        >
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="password"
            className="grow text-right font-semibold text-[#203d3f] placeholder-gray-500 pr-2"
            placeholder=""
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
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </label>
        {/* <div className="label">
          <span className="label-text  text-[#203d3f]">
            کد ارسال شده به {phone} را وارد کنید.
          </span>
        </div>
        <div style={{ direction: "ltr" }}>
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            shouldAutoFocus={true}
            isInputNum={true}
            hasErrored={otpError}
            containerStyle="flex flex-row gap-2 w-full justify-center mt-1"
            errorStyle="  !border-red-600"
            inputStyle="!size-12 !bg-[#00796a]/10 text-[#203d3f] input input-bordered font-bold text-xl"
          />
        </div> */}

        <button
          onClick={() => verifyOtp()}
          className={`btn !bg-[#00796a] !text-white w-full mt-8 text-base
                ${loading && "!cursor-not-allowed !bg-[#00796a]/50"}`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "دخول"
          )}
        </button>
      </div>
    );
  }

  const handleOtpChange = (otp) => {
    var en_otp = otp.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    setOtp(en_otp);
    // setTimeout(() => {
    handleOtpAutoSubmit();
    // }, 100
    // );
  };

  const handlePhoneChange = (phone) => {
    var en_phone = phone.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    setPhone(en_phone);
    // setTimeout(() => {
    // handleOtpAutoSubmit();
    // }, 100
    // );
  };

  const handleOtpAutoSubmit = () => {
    if (otp.length == 6) {
      verifyOtp();
    }
  };
  return (
    <>
      <div className=" relative z-1 mx-auto max-w-screen-lg justify-center h-[calc(100vh-3.75rem)] md:h-[calc(100vh-4.5rem)] overflow-hidden flex items-center">
        {/* <div className="absolute flex flex-row ">
          <div className="rounded-full mt-20 -ml-10 bg-green-600/50 blur-[80px] h-52 w-52 sm:h-72 sm:w-72 md:h-80 md:w-80 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
          <div className="rounded-full bg-green-600/50 blur-[60px] h-52 w-52 sm:h-72 sm:w-72 md:h-80 md:w-80 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
        </div> */}
        <div className="items-end backdrop-blur-lg shadow-lg bg-primary/15 text- w-full text-center rounded-lg max-w-screen-sm mx-5 min-[790px]:mx-auto py-6 relative z-2">
          <div className="flex flex-col justify-between min-h-96 items-center gap-3 px-5">
            <div className="flex flex-row justify-between items-center w-full">
              <Link to="/" className="navi-link" name="root">
                {/* <figure className="user-select-none  cursor-pointer">
                  <img
                    src="./img/logo.png"
                    alt="Vamchi Logo"
                    className="max-h-7 md:max-h-8 object-cover cursor-pointer"
                  />
                </figure> */}
                 <b  onClick={() => navigate("/")} className="font-extrabold text-[#00796a]">
            SALA
            </b>
              </Link>
              <h2 className="font-semibold text-lg  text-[#203d3f]">
                دخول | تسجيل{" "}
              </h2>
            </div>
            {showVerify == false ? LoginComponent() : VerifyComponent()}
            <div className="label mt-8"></div>
          </div>
        </div>
      </div>
      <footer className="grid-flow-row bg-[#00796a] text-white user-select-none max-w-7xl mx-auto rounded-t-xl">
        <div className="flex items-center justify-center mx-auto max-w-6xl w-full py-5 px-4 sm:px-5 md:py-6 xl:px-0">
          <p className="text-sm md:text-base rtl:hidden">
            © Admiral Trading international UAE 2024
          </p>
          <p className="text-sm md:text-base ltr:hidden">
            © التجارة الدولية سالا 2024
          </p>

          <p className="text-xs rtl:hidden md:text-sm font-light min-420:block hidden">
            All Rights Reserved.
          </p>
          {/* <div className="flex align-middle items-center justify-center">
            <img
              className="w-12 h-12 object-contain rounded-lg"
              src="/img/logo-s.png"
            />
          </div> */}
        </div>
      </footer>

      <a
        target="_blank"
        href="https://t.me/alibuy_support"
        className="p-0 btn btn-primary !bg-[#00796a] border-0 w-[55px] h-[55px] -min-480:w-[60px] -min-480:h-[60px] rounded-2xl fixed bottom-[5.25rem] -min-480:bottom-[5.5rem] flex items-center z-10 right-4 -min-480:right-6"
      >
        <FaTelegram className="size-9 text-white" />
      </a>
      {/* <a
        href="https://wa.me/971503123038"
        className="p-0 btn btn-primary !bg-[#00796a] border-0 w-[55px] h-[55px] -min-480:w-[60px] -min-480:h-[60px] rounded-2xl fixed bottom-[5.25rem] -min-480:bottom-[5.5rem] flex items-center z-10 right-4 -min-480:right-6"
      >
        <IoLogoWhatsapp className="size-9 text-white" />
      </a> */}
    </>
  );
};

export default Login;
