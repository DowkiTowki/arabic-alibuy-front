import React, { useState, useRef, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";

import { slide as Menu } from "react-burger-menu";
import PN from "persian-number";
import { connect } from "react-redux";
import { getLiveDerham } from "../services/slices/liveDerham";
import MegaMenu from "./MegaMenu";

function MainLayout({ liveDerham }) {
  document.documentElement.setAttribute("lang", "fa");
  document.documentElement.setAttribute("dir", "rtl");
  document.documentElement.classList.remove("ltr");
  document.documentElement.classList.add("rtl");
  const navigate = useNavigate();
  // const location = useLocation();
  // const pathname = location.pathname;
  // const exception = ["/s/1"];
  const [menuOpen, handleMenuOpen] = useState(false);

  return (
    <>
      <header className="grid-flow-row bg-white shadow-md backdrop-blur sticky top-0 max-w-7xl mx-auto z-2 user-select-none rounded-b-xl">
        <div className="flex items-center justify-between mx-auto max-w-6xl w-full pt-3 pb-2 px-6 xl:px-1">
          <div className="flex align-middle items-center justify-center">
            {/* <img
              onClick={() => navigate("/")}
              className="max-w-[5.5rem] md:max-w-[7.75rem] cursor-pointer"
              src="/img/logo-s.png"
            /> */}
            <b  onClick={() => navigate("/")} className="font-extrabold text-[#00796a]">
            SALA
            </b>
            {/* {liveDerham > 0 && (
              <div className="flex flex-col md:hidden text-xs min-w-20 gap-1 w-full items-center mr-3">
                <span>قیمت درهم</span>
                <span>
                  {PN.sliceNumber(liveDerham)}
                  <small className="text-[0.6rem]"> ر.س</small>
                </span>
              </div>
            )} */}
            {/* <img
              onClick={() => navigate("/en")}
              className="max-w-[5.5rem] rtl:hidden md:max-w-[7.75rem] cursor-pointer"
              src="/img/logo-s.png"
            /> */}
          </div>
          <div className="flex flex-row gap-2 w-full justify-end md:justify-between items-center mr-5">
            {/* <Link
              to="/en"
              className="ltr:hidden btn max-md:!min-h-10 max-md:!h-10 text-[#2E2D2D] border border-[#2E2D2D] !bg-transparent hover:scale-95 px-3 md:px-4 py-2 rounded "
            >
              En
            </Link>
             */}
            {/* <a
              href="https://wa.me/971503123038"
              className="rtl:hidden btn max-md:!min-h-10 max-md:!h-10 text-[#2E2D2D] !bg-transparent border border-[#2E2D2D] hover:scale-95 px-4 py-2 rounded min-w-28"
            >
              Contact Us
            </a> */}

            {/* <a
              href="https://wa.me/971503123038"
              className="btn max-md:!min-h-10 max-md:!h-10 text-[#203d3f] !bg-transparent   border-[#203d3f] font-extrabold hover:scale-95 px-4 py-2 rounded min-w-28"
            >
              تماس‌باما
            </a> */}

            <div className="flex gap-2">
<MegaMenu/>

              <Link
                to="/contact-us"
                className="btn btn-ghost text-[#203d3f] !bg-transparent border-none hover:scale-[0.98] p-2 md:px-3 max-md:hidden"
              >
                <span className="maLink:hidden">اتصل بنا</span>
              </Link>
              <Link
                to="/about-us"
                className="btn btn-ghost text-[#203d3f] !bg-transparent border-none hover:scale-[0.98] p-2 md:px-3 max-md:hidden"
              >
                <span className="maLink:hidden">معلومات عنا</span>
              </Link>
              {/* <a
                target="_blank"
                href="https://admiraltrading.ae"
                className="btn btn-ghost text-[#203d3f] !bg-transparent border-none hover:scale-[0.98] p-2 md:px-3 max-md:hidden"
              >
                <span className="maLink:hidden">خرید عمده</span>
              </a> */}
            </div>

            {/* {liveDerham > 0 && (
              <div className="flex flex-col text-xs max-md:hidden min-w-20 gap-1 items-center md:mr-auto">
                <span>قیمت درهم</span>
                <span>{PN.sliceNumber(liveDerham)} ر.س</span>
              </div>
            )} */}

            <Link
              to="/cart"
              className="btn max-md:!min-h-10 max-md:!h-10 text-[#203d3f] !bg-transparent border border-[#203d3f] font-extrabold hover:scale-[0.98] p-2 md:px-3 rounded md:mr-auto"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
            </Link>
            {localStorage.getItem("userToken") ? (
              <>
                <Link
                  to="/profile"
                  className="btn max-md:!min-h-10 max-md:!h-10 text-[#203d3f] !bg-transparent border border-[#203d3f] hover:scale-[0.98] p-2 md:px-3 rounded"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-5 inline "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </span>
                </Link>
                {/* <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn max-md:!min-h-10 max-md:!h-10 text-[#203d3f] !bg-transparent border border-[#203d3f] hover:scale-[0.98] p-2 md:px-3 rounded"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5 inline "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-1 bg-white rounded-box z-5 w-56 px-2 py-4 shadow-lg gap-1"
                  >
                    <li>
                      <div className="justify-between items-start flex flex-col py-0">
                        <span className="w-full font-semibold text-base">
                          {localStorage.getItem("userName")}
                          &nbsp;
                        </span>
                        <span
                          className="w-full font-semibold text-left"
                          style={{ direction: "ltr" }}
                        >
                          {" "}
                          {localStorage.getItem("userPhone")}
                        </span>
                      </div>
                    </li>
                    <div className="divider my-0"></div>
                    <li>
                      <Link
                        to="/profile/orders"
                        className="justify-between hover:scale-95"
                      >
                        سفارشات
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="justify-between hover:scale-95"
                      >
                        عربة التسوق
                      </Link>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://t.me/alibuy_support"
                        className="justify-between hover:scale-95"
                      >
                        پشتیبانی تلگرام
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://wa.me/971503123038"
                        className="justify-between hover:scale-95"
                      >
                        پشتیبانی واتسپ
                      </a>
                    </li>
                    <div className="divider my-0 md:hidden"></div>
                    <li>
                      <Link
                        to="/contact-us"
                        className="justify-between hover:scale-95 md:hidden"
                      >
                        تماس‌باما
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about-us"
                        className="justify-between hover:scale-95 md:hidden"
                      >
                        درباره‌ما
                      </Link>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://admiraltrading.qe"
                        className="justify-between hover:scale-95 md:hidden"
                      >
                        خرید عمده
                      </a>
                    </li>
                    <div className="divider my-0"></div>
                    <li>
                      <Link
                        to="/logout"
                        className="justify-between hover:scale-95 text-red-600 focus-within:text-red-800"
                      >
                        خروج از حساب
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 mr-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div> */}
              </>
            ) : (
              <Link
                to="/login"
                className="btn max-md:!min-h-10 max-md:!h-10 text-[#203d3f] !bg-transparent border border-[#203d3f] hover:scale-[0.98] p-2 md:px-3 rounded"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 inline "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </span>
              </Link>
            )}

            {/* <Link
              to="/en/price-list"
              className="rtl:hidden btn border-0 max-md:!min-h-10 max-md:!h-10 text-[#00796a] !bg-[#2E2D2D] hover:scale-95 px-4 py-2 rounded min-w-28"
            >
              Price List
            </Link>
            <Link
              to="/fa/price-list"
              className="ltr:hidden btn border-0 max-md:!min-h-10 max-md:!h-10 text-[#00796a] !bg-[#2E2D2D] hover:scale-95 px-4 py-2 rounded min-w-28"
            >
              لیست قیمت
            </Link> */}

            {/* <button className="btn border-0 max-md:!min-h-10 max-md:!h-10 text-[#00796a] !bg-[#2E2D2D] hover:scale-95 px-4 py-2 rounded min-w-28 sm:flex hidden">
              BRANCHES
            </button> */}
          </div>
        </div>
        <div className="h-10"></div>
      </header>
      {/* <Menu
        overlayClassName="!top-0 backdrop-blur-xl"
        className="bg-white/70 max-w-96 !left-0 !top-0"
        burgerButtonClassName="!hidden"
        burgerBarClassName="!hidden"
        width="100%"
        onClose={() => handleMenuOpen(false)}
        onOpen={() => handleMenuOpen(true)}
        isOpen={menuOpen}
        crossButtonClassName="relative !left-3 !right-auto !top-3 !size-10 p-2"
        customCrossIcon={
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`size-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        }
      >
        <div className="h-full overflow-hidden justify-between select-none pt-20 pb-8 !flex flex-col">
          <nav>
            <ul className="menu gap-2 py-0 px-3">
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/آیفون"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                >
                  آیفون
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/مک بوک"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                >
                  مک بوک
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/لپتاپ"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                >
                  لپتاپ
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/محصولات های‌کپی"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                >
                  محصولات های‌کپی
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/جانبی اورجینال اپل"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                >
                  جانبی اورجینال اپل
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/کیس و گلس موبایل"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                  name="calc"
                >
                  کیس و گلس موبایل
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleMenuOpen(false)}
                  to="/products/تجهیزات تولید محتوا"
                  className="navi-link px-2 text-gray-800 text-base font-bold btn-ghost"
                  name="calc"
                >
                  تجهیزات تولید محتوا
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Menu> */}
      <div className="min-h-[calc(100vh-7.75rem)] md:min-h-[calc(100vh-9rem)]">
        <Outlet />
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
      {/* <a target="_blank"
        href="https://t.me/alibuy_support"
        className="p-0 btn btn-primary !bg-[#00796a] border-0 w-[55px] h-[55px] -min-480:w-[60px] -min-480:h-[60px] rounded-2xl fixed bottom-4 -min-480:bottom-6 flex items-center z-10 right-4 -min-480:right-6"
      >
        <FaTelegram className="size-9 text-white" />
      </a> */}
      {/*
      <button className="btn btn-primary bg-gradient-to-bl from-red-500 via-orange-500 to-yellow-500 w-28 rounded-xl fixed bottom-[4.5rem] hidden sm:flex items-center z-10 right-5 min-[900px]:right-[unset] min-[900px]:-mr-32">
        {" "}
        <svg
          className="w-5 h-5 inline mb-[0.15rem]"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <rect x="4" y="13" rx="2" width="4" height="6" />{" "}
          <rect x="16" y="13" rx="2" width="4" height="6" />{" "}
          <path d="M4 15v-3a8 8 0 0 1 16 0v3" />{" "}
          <path d="M18 19a6 3 0 0 1 -6 3" />
        </svg>
        پشتیبانی
      </button> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  liveDerham: state.liveDerham.liveDerham,
});

export default connect(mapStateToProps, { getLiveDerham })(MainLayout);
