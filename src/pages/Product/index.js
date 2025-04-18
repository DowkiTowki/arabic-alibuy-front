import { useState, useEffect } from "react";
import ProductImgSlider from "./ProductImgSlider";
import PN from "persian-number";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { setLiveDerham } from "../../services/slices/liveDerham";
import { useAppDispatch } from "../../hooks/useRedux";

const Product = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category");
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [product, setProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [window.location.search]);

  async function addToCart(toCart = false) {
    if (product.options && !selectedOption) {
      // toast.error(product.options.title + " را انتخاب کنید.");
      toast.error("يرجى اختيار اللون.");

    } else {
      try {
        await axiosInstance
          .post("/cart/ar", {
            productId: id,
            type: "add",
            option: selectedOption?.title ?? null,
          })
          .then((response) => {
            if (response.data.error == true) {
              // setOtpError(true);
              // setOtp("");
              toast.error(response.data.message);
              if (response.data.status == 401) {
                localStorage.setItem(
                  "toAdd",
                  JSON.stringify({
                    productId: id,
                    type: "add",
                    option: selectedOption?.title ?? null,
                  })
                );
                localStorage.setItem("returnUrl", "/cart");
                setTimeout(function () {
                  navigate("/login");
                }, 1000);
              }
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
  }

  async function getProduct() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/product/" + id+'/ar')
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setProduct(response.data.data);
            dispatch(setLiveDerham(response.data.derham));
            // setSelectedOption(JSON.parse(response.data.data.options)[0]);
            // setSelectedOption({...selectedOption,id:0});
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
          <div className="grid lg:grid-cols-[40%_auto] grid-cols-1 w-full gap-4 lg:gap-5">
            <div className="skeleton aspect-square w-full"></div>
            <div
              className="skeleton min-h-72 h-full w-full"
              style={{ animationDelay: "0.05s" }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl xl:mx-auto mt-5 mb-40">
          <div className="breadcrumbs text-sm mb-3 px-4">
            <ul>
              <li>
                <Link to="/">SALA</Link>
              </li>
              <li>
                {/* <Link to="/products/کالای دیجیتال"> */}
           
                المنتجات
                {/* </Link> */}
              </li>
              {/* <li>
                <Link to="/products/موبایل">موبایل</Link>
              </li> */}
              <li>{product.title}</li>
            </ul>
          </div>
          <div className="grid gap-4 md:gap-3 md:grid-cols-[40%_auto] grid-cols-1 w-full">
            <div className="w-full shadow rounded-lg bg-white">
              <ProductImgSlider
                // aspectRatio={"16/9"}
                title={product.title}
                rounded={true}
                loop={false}
                perViewMobile={1}
                perView={1}
                images={product.image}
              />
            </div>
            <div className="card card-compact shadow rounded-lg mx-3 lg:mr-0">
              <div className="card-body gap-5 lg:gap-6 lg:!py-10">
                <div className="flex gap-1 flex-col">
                  <h2 className="card-title font-medium">{product.title}</h2>
                  <div className="flex gap-2 md:gap-y-1 flex-row flex-wrap">
                    {product.tags2 &&
                      JSON.parse(product.tags2).map((t, idx) => (
                        <div
                          key={idx}
                          className="badge font-light badge-lg bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]"
                        >
                          {t}
                        </div>
                      ))}
                    {product.tags &&
                      JSON.parse(product.tags).map((t, idx) => (
                        <div
                          key={idx}
                          className="badge font-light badge-lg bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]"
                        >
                          {t}
                        </div>
                      ))}
                  </div>
                </div>

                {/* <h2 className="card-title text-base font-light"> */}
                {/* Black / White / Pink / UltraMarine */}
                {/* <br /> */}
                {/* 2022 | M2 8GB - 8-CPU 10-GPU | 512 GB SSD | 15.3" */}
                {/* </h2> */}
                {product.options != null && product.options != "" && (
                  <div className="flex flex-col gap-3 mt-auto pt-4">
                    <span className="font-normal text-base">
                      {selectedOption == null ? (
                        <>
                        اختيار اللون
                         {/* اختيار {product.options.title} */}
                        </>
                      ) : (
                        <>
                          {product.options.title}:{" "}
                          <span className="font-medium">
                            {selectedOption?.title}
                          </span>
                        </>
                      )}
                    </span>

                    <div className="flex flex-row gap-3">
                      {product.options &&
                        product.options.options.map((o, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedOption({ ...o, id: idx })}
                            className={`${
                              selectedOption?.id == idx
                                ? "bg-[#00796a]/15 !border-[#00796a] font-medium"
                                : " border-gray-300 font-normal"
                            } badge badge-outline px-1 badge-lg h-8 gap-2`}
                          >
                            <span
                              style={{ backgroundColor: o.color }}
                              className="size-6 shadow rounded-full flex justify-center items-center"
                            >
                              {selectedOption?.id == idx && (
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
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>
                              )}
                            </span>
                            {/* {o.title} */}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-3 lg:mt-6 md:flex-row-reverse justify-between">
                  <span className="text-end text-lg">
                    {product.isActive == 1 ? (
                      <>
                        {PN.sliceNumber(product.price)}{" "}
                        <small className="text-xs">ر.س</small>
                      </>
                    ) : (
                      <small className="text-sm">غير متوفر</small>
                    )}
                  </span>
                  <div className="flex flex-col gap-3 min-w-52">
                    <button
                      disabled={!product.isActive}
                      className="btn !border-[#00796a] !bg-[#00796a] disabled:opacity-50 font-medium text-lg  !text-white hover:scale-[0.98] transition-all"
                      onClick={() => addToCart(true)}
                    >
                      إضافة إلى سلة التسوق
                    </button>

                    {/* <button
                      className="btn !border-[#00796a] !text-[#00796a] font-semibold text-lg   !bg-white hover:scale-[0.98] transition-all"
                      onClick={() => addToCart(true)}
                    >
                      سفارش سریع
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(product.description != "[[null,null]]" && product.description != null )&& (
            <div className="grid gap-3 grid-cols-1 w-full max-lg:px-3">
              <div className="card card-compact shadow rounded-lg w-full mt-5 lg:mt-6">
                <div className="card-body gap-3 lg:gap-4 lg:!py-10">
                  {JSON.parse(product.description).map((i, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2 md:grid-cols-3 items-start gap-3 border-b pb-1"
                    >
                      <span className="text-base font-normal text-gray-500 min-w-[30%]">
                        {i[0]}
                      </span>
                      <span className="text-base font-light w-full">
                        {i[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {product.subtitle && (
            <div className="grid gap-3 grid-cols-1 w-full max-lg:px-3">
              <div className="card card-compact shadow rounded-lg w-full my-3">
                <div className="card-body gap-3 lg:gap-4">
                  <p className="text-base font-light">{product.subtitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <dialog id={`bottomCartDialog`} className="modal modal-bottom">
        <div className="modal-box bg-white relative overflow-hidden max-w-xl mx-auto max-h-[calc(100vh-10rem)]">
          <div className="sticky top-0 left-0 right-0 bg-white z-10 border-b pb-3">
            <form method="dialog">
              <button className="btn btn-sm btn-circle bg-gray-200 hover:bg-gray-300 border-0 absolute right-0 top-0">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mr-10">عربة التسوق</h3>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-7rem)] px-1 pt-1 pb-14 ">
            {cartProducts.length > 0 ? (
              <>
                <div className="mb-40 text-sm bg-white">
                  {cartProducts.map((product, idx) =>
                    cartProduct(product, idx, cartProducts.length == idx + 1)
                  )}
                </div>
              </>
            ) : (
              <>
                {!loading && (
                  <div className="mb-20 text-sm bg-white">
                    <div className="w-100 flex flex-col pt-4 pb-3">
                      <h2
                        className={`font-semibold text-center text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
                      >
                        محصولی در سبد خرید یافت نشد!
                      </h2>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 w-full z-2 ">
          <div className="w-full mx-auto bg-white max-w-xl dark:bg-gray-950 border-t-2 sm:border-x-4 dark:sm:border-x-2 border-neutral-50 dark:border-gray-800 rounded-t-2xl">
            <div className="flex justify-between m-3">
              <button
                className="btn !bg-[#00796a] border-none text-base text-bold text-white w-full shadow-xl items-center justify-between px-3"
                onClick={() => navigate("/cart")}
              >
                الانتقال إلى سلة التسوق
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );

  function cartProduct(product, idx, isLast) {
    return (
      <div
        key={idx}
        className={`w-100 flex flex-col p-1 ${!isLast && "border-b"}`}
      >
        <div className={`flex flex-row gap-4 mb-4`}>
          <div className="flex flex-col gap-2 w-full">
            <div
              className={`font-semibold text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
            >
              {product.title}
              <div className="flex gap-x-2 gap-y-1 flex-row justify-end flex-wrap">
                {product.subTitle &&
                  JSON.parse(product.subTitle).map((t, idx) => (
                    <div
                      key={idx}
                      className="badge font-light bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]"
                    >
                      {t}
                    </div>
                  ))}
              </div>

              {product.option != null && <> {product.option}</>}
              <br />
            </div>
            <div
              className={`flex flex-col-reverse gap-1 min-[350px]:gap-0 min-[350px]:flex-row max-[350px]:items-start w-full justify-between
        items-center
        `}
            >
              <div className="text-sm font-semibold !text-[#203d3f] !bg-[#00796a]/20 py-1 px-3 rounded-lg">
                X{product.qty}
              </div>

              <div className="flex flex-col gap-1 -mt-1- justify-end max-[350px]:w-full max-[350px]:justify-end">
                <b className="text-end text-sm">
                  {PN.convertEnToPe(PN.sliceNumber(product.price))}{" "}
                  <small>ر.س</small>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
