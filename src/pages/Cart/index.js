import { useState, useEffect } from "react";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate } from "react-router-dom";
import PN from "persian-number";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";
// import AddVoucher from "./AddVoucher";

const Cart = () => {
  const addTo = localStorage.getItem("toAdd") ?? null;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [voucher, setVoucher] = useState(null);
  const [voucherCode, setVoucherCode] = useState(null);
  const [billDetails, setBillDetails] = useState([]);
  useEffect(() => {
    getCart();
    if (addTo != null) {
      addAfterLogin();
    }
    window.scrollTo(0, 0);
  }, []);

  async function updateCart(i, t, o) {
    setLoading(true);
    try {
      await axiosInstance
        .post("/cart/ar", { productId: i, type: t, option: o })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setProducts(response.data.cart);
            console.log(response.data.billDetails);
            setBillDetails(response.data.billDetails);
            setVoucher(response.data.voucher);
            setVoucherCode(response.data.voucher?.code ?? null);
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

  async function applyVoucher(type) {
    setLoading(true);
    try {
      await axiosInstance
        .post("/cart/ar", {
          voucher: type == "apply" ? voucherCode : null,
          type: "voucher",
        })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.voucher.message);
          } else {
            toast.success(response.data.voucher?.message);
            // setProducts(response.data.cart);
            setBillDetails(response.data.billDetails);
            setVoucher(response.data.voucher);
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

  async function getCart() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/checkout/ar")
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setProducts(response.data.cart);
            setBillDetails(response.data.billDetails);
            setVoucher(response.data.voucher);
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

  async function addAfterLogin() {
    try {
      setLoading(true);
      await axiosInstance
        .post("/cart/ar", JSON.parse(addTo))
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            localStorage.removeItem("toAdd");
            toast.success("تم إضافة المنتج إلى عربة التسوق!");
            getCart();
            // document.getElementById("bottomCartDialog").showModal();
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

  const navigate = useNavigate();
  const [qty, setQty] = useState(0);

  function cartProduct(product, idx, isLast) {
    return (
      <div
        key={idx}
        className={`w-100 flex flex-col pt-4 pb-3 ${!isLast && "border-b"}`}
      >
        <div className={`flex flex-row gap-2 mb-4`}>
          <div className="flex flex-col gap-4 w-full">
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
            </div>
            <div
              className={`flex flex-col-reverse gap-1 min-[350px]:gap-0 min-[350px]:flex-row max-[350px]:items-start w-full justify-between
        items-center
        `}
            >
              <div className="flex flex-col gap-1">
                <div className="join rounded">
                  <button
                    disabled={loading}
                    onClick={() =>
                      updateCart(
                        product.product_id,
                        "add",
                        product.option ?? null
                      )
                    }
                    className="btn btn-sm !bg-[#00796a] disabled:opacity-70 border-0 !text-white p-0 w-8 join-item !rounded"
                    style={{ marginInlineStart: "-1px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.6}
                      stroke="currentColor"
                      className="size-[1.3rem]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <button
                    disabled
                    className="btn btn-sm border-0 text-base shadow-none join-item px-0 w-9 min-[374px]:w-[2.6rem] min-[640px]:w-[3.15rem] countdown countdown-zf "
                  >
                    <span style={{ "--value": product.qty }}></span>
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      qty == 1
                        ? updateCart(
                            product.product_id,
                            "remove",
                            product.option ?? null
                          )
                        : updateCart(
                            product.product_id,
                            "dec",
                            product.option ?? null
                          );
                    }}
                    className={`btn btn-sm p-0 w-8 join-item !rounded disabled:opacity-50 !border-[#203d3f] !text-[#203d3f]`}
                  >
                    {product.qty == 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.25}
                        stroke="currentColor"
                        className="size-[1.1rem] text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.6}
                        stroke="currentColor"
                        className="size-[1.3rem]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 -mt-1- justify-end max-[350px]:w-full max-[350px]:justify-end">
                <span className="text-end text-sm font-semibold">
                  {PN.convertEnToPe(PN.sliceNumber(product.price))}{" "}
                  <small>ر.س</small>
                </span>
              </div>
            </div>
          </div>
          <figure
            className={` user-select-none relative 
              min-w-16 min-[374px]:min-w-20 min-[640px]:min-w-24 min-h-16 min-[374px]:min-h-20 min-[640px]:min-h-24`}
          >
            <ProgressiveImage
              src={product.image}
              placeholder="/img/noimg.png"
              className={`shadow-sm object-cover rounded 
                h-16 w-16 min-[374px]:w-20 min-[374px]:h-20 min-[640px]:w-24 min-[640px]:h-24 `}
            />
          </figure>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-full max-w-screen-sm mx-auto">
      <div className="mx-auto max-w-6xl w-full p-3 xl:px-1 flex justify-between items-center rounded-lg my-3 md:my-4">
        <h2 className="card-title">عربة التسوق</h2>
        {loading == true && (
          <span className="loading loading-dots w-7 !text-[#00796a]"></span>
        )}
      </div>
      {products.length > 0 ? (
        <>
          <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 p-3 md:px-4">
            {products.map((product, idx) =>
              cartProduct(product, idx, products.length == idx + 1)
            )}
          </div>

          {/* <AddVoucher
            orderVoucher={voucher}
            // updateCheckout={updateCheckout}
          /> */}

          {/* <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 py-2 px-3 md:px-4">
            <div className="text-base font-semibold my-2 text-[#00796a]">
              کد تخفیف
            </div>
            <label
              className={`${
                voucher?.success == true && "!bg-[#00796a]/20"
              } input input-bordered w-full mb-3 border-gray-300 flex items-center gap-2 pl-2`}
              style={{ direction: "ltr" }}
            >
              {voucher?.success == true ? (
                <button
                  disabled={loading}
                  className="btn btn-sm  border-[#00796a] text-[#00796a] disabled:opacity-70 !bg-white text-base text-bold px-4 shadow-xl items-center "
                  onClick={() => {
                    applyVoucher("remove");
                  }}
                >
                  حذف کد تخفیف
                </button>
              ) : (
                <button
                  disabled={loading || voucherCode?.length < 1}
                  className="btn btn-sm !bg-[#00796a] disabled:opacity-70 border-none text-base text-bold !text-white px-4 shadow-xl items-center "
                  onClick={() => {
                    applyVoucher("apply");
                  }}
                >
                  بررسی کد
                </button>
              )}

              <input
                disabled={voucher?.success == true}
                onChange={(e) => setVoucherCode(e.target.value)}
                type="text"
                required
                defaultValue={voucher?.code}
                className="grow w-full text-center tracking-[0.25rem] font-mono font-semibold uppercase"
              />
              <span className="size-6 min-w-6 opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6 opacity-70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
            </label>
            {voucher?.message ? (
              <p className="!text-[#00796a] font-semibold ">
                {voucher?.message}
              </p>
            ) : (
              <p className="text-[#203d3f] ">
                اگر کد تخفیف دارید، بر سفارش خود اعمال کنید.
              </p>
            )}
          </div> */}

          <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 py-2 px-3 md:px-4">
            {billDetails.map((item, idx) => (
              <div
                key={idx}
                className={`flex mb-3 flex-col justify-between 
              ${billDetails.length != idx + 1 && "border-b"}
              ${idx == 0 && "mt-3"}
            `}
              >
                {item.map((i, idxx) => (
                  <div
                    key={idxx}
                    className={`flex mb-2 flex-row justify-between items-center cursor-pointer rounded-md transition-all
            ${i.primaryColor == true ? "!text-[#00796a]" : "!text-[#203d3f]"} ${
                      i.bold == true ? "font-semibold" : ""
                    }`}
                  >
                    <p>{i.title}</p>
                    <div className="flex flex-row items-center">
                      {i.type == "text" ? (
                        <span>{i.value}</span>
                      ) : i.value == "free" ? (
                        <span>مجاني</span>
                      ) : (
                        <>
                          <span>
                            {" "}
                            {PN.convertEnToPe(PN.sliceNumber(i.value))}
                          </span>
                          <small className="mr-1">ر.س</small>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 mb-44 w-full">
            <div className="flex justify-between mx-2 md:mx-0 shadow rounded-lg bg-white dark:bg-gray-900 p-3">
              <button
                disabled={true}
                // disabled={loading}
                className="btn !bg-[#00796a] disabled:opacity-70 border-none text-base text-bold !text-white w-full max-w-[calc(50%-0.25rem)] shadow-xl items-center px-0"
                onClick={() => {
                  // navigate("/checkout");
                }}
              >
                متابعة
              </button>
              <button
                className="btn border-[#00796a] text-[#00796a] text-[0.9rem] min-[374px]:text-base text-bold w-full max-w-[calc(50%-0.25rem)] shadow-xl items-center px-0 gap-1"
                onClick={() => {
                  navigate(-1);
                }}
              >
                العودة
                {/* <small className="text-xs">به لیست محصولات</small> */}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {!loading && (
            <div className="mt-4 mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 p-3 md:px-4">
              <div className="w-100 flex flex-col pt-4 pb-3">
                <h2
                  className={`font-semibold text-center text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
                >
                  لا يوجد منتج في سلة المشتريات!
                </h2>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
