import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
// import ProfileLayout from "./layouts/ProfileLayout";
import Motion from "./helpers/Motion";
import Home from "./pages/Home";
// import Profile from "./pages/Profile";
import Product from "./pages/Product";
import ProductsList from "./pages/ProductsList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import Tickets from "./pages/Tickets";
// import Ticket from "./pages/Ticket";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Post from "./pages/Post";
import axiosInstance from "./services/axiosConfig";

export default function App() {
  const location = useLocation();
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");


  const [duration, setDuration] = useState(40);
  const [items, setTickers] = useState(["في حالة حدوث مشكلة في الموقع أو للاستشارة قبل الشراء، يمكنكم التواصل معنا عبر دعم التلغرام أو إرسال تذكرة."]);


  useEffect(() => {
    // getTickers();
  }, []);

  async function getTickers() {
    // setLoading(true);
    try {
      await axiosInstance
        .post(`/ticker/all`)
        .then((response) => {
          if (response.data.error == true) {
            // toast.error(response.data.message);
          } else {
            setTickers(response.data);
            const maxLength = response.data.reduce(
              (max, item) => Math.max(max, item.length),
              0
            );
            const calculatedDuration = Math.max(5, maxLength * 0.6) + 30;
            setDuration(calculatedDuration);
          }
        })
        .catch((error) => {
          // setLoading(false);
        });
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="min-h-screen h-full user-select-none bg-gray-50 dark:bg-gray-950 max-w-7xl mx-auto">
      <div
        className={`${location.pathname.includes("login") && "!hidden"} overflow-hidden top-[60px] border-b-2 md:top-[68px] fixed max-w-7xl mx-auto z-3 shadowinner whitespace-nowrap border-tborder-[#00796a] w-full bg-white rounded-b-xl`}
      >
        <div
          className="ticker font-light items-center py-2"
          // ref={tickerRef}
          style={{
            animationDuration: `${duration}s`,
          }}
        >
          <img
            className="max-w-[1.25rem] w-[1.25rem] h-[1.25rem] opacity-40 cursor-pointer"
            src="/alibuy-40.png"
          ></img>
          {items.map((item, index) => (
            <>
              <div className="px-14 inline-block">{item}</div>
              <img
                className="max-w-[1.25rem] w-[1.25rem] h-[1.25rem] opacity-40 cursor-pointer"
                src="/alibuy-40.png"
              ></img>
            </>
          ))}
          {items.map((item, index) => (
            <>
              <div className="px-14 inline-block">{item}</div>
              <img
                className="max-w-[1.25rem] w-[1.25rem] h-[1.25rem] opacity-40 cursor-pointer"
                src="/alibuy-40.png"
              ></img>
            </>
          ))}
          {items.map((item, index) => (
            <>
              <div className="px-14 inline-block">{item}</div>
              <img
                className="max-w-[1.25rem] w-[1.25rem] h-[1.25rem] opacity-40 cursor-pointer"
                src="/alibuy-40.png"
              ></img>
            </>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={Motion(<Home />)} />
            <Route path="/cart" element={Motion(<Cart />)} />
            <Route path="/checkout" element={Motion(<Checkout />)} />

            <Route path="/product/:id" element={Motion(<Product />)} />
            <Route
              path="/products/:id/:title?"
              element={Motion(<ProductsList />)}
            />
            <Route path="/contact-us" element={Motion(<Contact />)} />
            <Route path="/about-us" element={Motion(<About />)} />
            <Route path="/blog/:slug" element={Motion(<Post />)} />
          </Route>

          <Route path="/profile/*" element={<Navigate to="/" />} />
          
          <Route path="/login" element={Motion(<Login />)} />
          <Route path="/logout" element={Motion(<Logout />)} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
