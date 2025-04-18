import { useState, useEffect } from "react";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate } from "react-router-dom";
import PN from "persian-number";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosConfig";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [info, setInfo] = useState({
    name: localStorage.getItem("userName") ?? "",
    phone: localStorage.getItem("userPhone") ?? "",
    email: localStorage.getItem("userEmail") ?? "",
    state: "",
    city: "",
    address: "",
    postalCode: "",
    description: "",
  });

  const [products, setProducts] = useState([]);
  const [billDetails, setBillDetails] = useState([]);
  useEffect(() => {
    getCart();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading && products.length == 0) {
      navigate("/cart");
    }
  }, [products]);
  async function getCart() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/checkout/ar")
        .then((response) => {
          // localStorage.setItem("liveDerham", 20000);
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setAddresses(response.data.addresses);
            setInfo({
              ...info,
              state: response.data.addresses?.state ?? "",
              city: response.data.addresses?.city ?? "",
              address: response.data.addresses?.address ?? "",
              postalCode: response.data.addresses?.postalCode ?? "",
            });
            setProducts(response.data.cart);
            setBillDetails(response.data.billDetails);
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
  function toPlaceOrder() {
    // if (errors) {
    placeOrder();
    // } else {
    // checkErrors();
    // }
  }

  async function placeOrder() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/palceOrder", {
          name: info.name,
          phone: info.phone,
          email: info.email,
          state: info.state,
          city: info.city,
          address: info.address,
          postalCode: info.postalCode,
          description: info.description,
        })
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            toast.success(response.data.message);
            navigate("/profile/orders");
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
  function checkoutProduct(product, idx, isLast) {
    return (
      <div className={`w-100 flex flex-col p-1 ${!isLast && "border-b"}`}>
        <div className={`flex flex-row gap-4 mb-4`}>
          <div className="flex flex-col gap-2 w-full">
            <div
              className={`font-semibold text-base max-sm:text-sm user-drag-touch-none mt-1 md:mt-0`}
            >
              {product.title}
              <div className="flex gap-x-2 gap-y-1 flex-row justify-end flex-wrap">
                {product.subTitle &&
                  JSON.parse(product.subTitle).map((t, idx) => (
                    <div className="badge font-light bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]">
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
              <div className="text-sm font-semibold !text-[#203d3f] !bg-[#00796a]/20 py-1 px-3 rounded-lg">
                X{product.qty}
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
        <h2 className="card-title">تکمیل سفارش</h2>
        {loading == true && (
          <span className="loading loading-dots w-7 !text-[#00796a]"></span>
        )}
      </div>

      <div className="mx-2 mb-4 text-sm shadow rounded-lg bg-white dark:bg-gray-900 py-2 px-3 md:px-4">
        <div className="text-base font-semibold mb-3 text-[#00796a]">
          اطلاعات شخصی
        </div>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">
              نام و نام‌خانوادگی <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            type="text"
            required
            defaultValue={info.name}
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">
              شماره موبایل <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            type="text"
            required
            defaultValue={info.phone}
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">ایمیل</span>
          </div>
          <input
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            type="text"
            defaultValue={info.email}
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <div className="divider mt-5"></div>
        <div className="text-base font-semibold mb-3 text-[#00796a]">
          آدرس تحویل
        </div>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">
              استان <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            onChange={(e) => setInfo({ ...info, state: e.target.value })}
            type="text"
            required
            defaultValue={info.state}
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">
              شهر <span className="text-red-500">*</span>
            </span>
          </div>
          <input
            onChange={(e) => setInfo({ ...info, city: e.target.value })}
            type="text"
            required
            defaultValue={info.city}
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">
              آدرس کامل <span className="text-red-500">*</span>
            </span>
          </div>
          <textarea
            required
            defaultValue={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="textarea textarea-bordered border-gray-300 w-full h-32"
          ></textarea>
        </label>

        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">کد پستی</span>
          </div>
          <input
            defaultValue={info.postalCode}
            onChange={(e) => setInfo({ ...info, postalCode: e.target.value })}
            type="text"
            className="input input-bordered border-gray-300 w-full"
          />
        </label>
        <div className="divider mt-5"></div>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text text-[#203d3f]">توضیحات</span>
          </div>
          <textarea
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
            className="textarea textarea-bordered border-gray-300 w-full h-32"
          ></textarea>
        </label>
      </div>

      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-base font-medium">منتجات السلة</div>
        <div className="collapse-content px-0">
          <div className="mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 py-2  px-3 md:px-4">
            {products.map((product, idx) =>
              checkoutProduct(product, idx, products.length == idx + 1)
            )}
          </div>
        </div>
      </div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-base font-medium">فاکتور سفارش</div>
        <div className="collapse-content px-0">
          <div className="mx-2 text-sm shadow rounded-lg bg-white dark:bg-gray-900 py-2 px-3 md:px-4">
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
                      ) : i.value == 0 ? (
                        <>__</>
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
        </div>
      </div>

      <div className="mt-4 mb-32 w-full">
        <div className="flex justify-between mx-3 md:mx-0 shadow rounded-lg bg-white dark:bg-gray-900 p-3">
          <button
            className="btn !bg-[#00796a] border-none text-base text-bold text-white w-full  shadow-xl items-center px-0"
            onClick={() => {
              toPlaceOrder();
            }}
          >
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
