import { useState, useEffect } from "react";
import ProductImgSlider from "./ProductImgSlider";
import PN from "persian-number";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import SingleProduct from "../Home/SingleProduct";
import { useAppDispatch } from "../../hooks/useRedux";
import { setLiveDerham } from "../../services/slices/liveDerham";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { id, title } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState({
    title: "سفید",
    id: 2,
    color: "#fafafa",
  });
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const options = [
    { title: "قرمز", id: 1, color: "#ed0909" },
    { title: "سفید", id: 2, color: "#fafafa" },
    { title: "آبی", id: 3, color: "#453fff" },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [category]);

  async function addToCart(toCart = false) {
    try {
      await axiosInstance
        .post("/cart/ar", { productId: id, type: "add" })
        .then((response) => {
          if (response.data.error == true) {
            // setOtpError(true);
            // setOtp("");
            toast.error(response.data.message);
          } else {
            toast.success("محصول به سبد خرید اضافه شد!");
            setCartProducts(response.data.cart);
            document.getElementById("bottomCartDialog").showModal();
            // if (toCart == true) {
            //   navigate("/cart");
            // }
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

  async function getProducts() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/category/" + id+'/ar')
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setProducts(response.data.data);
            dispatch(setLiveDerham(response.data.derham));
            if (
              searchParams.has("toCart") &&
              searchParams.get("toCart") == "true"
            ) {
              addToCart(true);
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
  return (
    <>
      {loading ? (
        <div className="w-full max-w-7xl mx-auto mb-20 px-2 mt-5">
          <div
            className="skeleton h-6 w-60 !rounded mb-2"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full gap-3 lg:gap-4">
            <div className="skeleton min-h-96 h-full w-full"></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.05s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.15s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.25s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="skeleton min-h-96 h-full w-full"
              style={{ animationDelay: "0.35s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl xl:mx-auto px-4 mt-5 mb-40">
          <div className="breadcrumbs text-sm mb-3">
            <ul>
              <li>
                <Link to="/">SALA</Link>
              </li>
              {/* <li> */}
                {/* <Link to="/products/کالای دیجیتال"> */}
                {/* {id > 62 ? "مکمل‌ها" : "کالای دیجیتال"} */}
                {/* </Link> */}
              {/* </li> */}
              {/* <li>
                <Link to="/products/موبایل">موبایل</Link>
              </li> */}
              <li>{title}</li>
            </ul>
          </div>
          <div className="grid gap-3 lg:gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full">
            {products.map((i, idx) => (
              <SingleProduct
                isList={true}
                key={idx}
                // addToCart={() => addToCart(i)}
                // setSheetData={() => setSheetData(i)}
                i={i}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsList;
