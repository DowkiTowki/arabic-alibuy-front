import { useAppDispatch } from "../../hooks/useRedux";
import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "../../helpers/ImageSlider";
import ProductsGroup from "./ProductsGroup";
// import productsData from "../../data/products-ar.json";
import moment from "moment";
import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import axiosInstance from "../../services/axiosConfig";
import { toast } from "react-toastify";
import { setLiveDerham } from "../../services/slices/liveDerham";


const Home = () => {
  const { cartId } = useParams();
  const [loading, setLoading] = useState(false);
  const [sheetData, setSheetData] = useState({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  async function addToCart(i) {
    try {
      await axiosInstance
        .post("/cart/ar", { productId: i.id, type: "add" })
        .then((response) => {
          if (response.data.error == true) {
            // setOtpError(true);
            // setOtp("");
            toast.error(response.data.message);
          } else {
            // toast.success(response.data.message);
            navigate("/cart");
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

  useEffect(() => {
    getProducts();
    // setProducts(productsData.data);
  }, []);

  async function getProducts() {
    setLoading(true);
    try {
      await axiosInstance
        .post("/home/ar")
        .then((response) => {
          if (response.data.error == true) {
            toast.error(response.data.message);
          } else {
            setProducts(response.data.data);
            dispatch(setLiveDerham(response.data.derham));
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

  const settings = {
    speed: 500,
    // initialSlide: 0,
    infinite: false,
    slidesToShow: 1.1,
    speed: 300,
    rows: 3,
    slidesPerRow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    rtl: true,
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col gap-4 w-full mx-auto max-w-6xl mt-6">
          <div className="skeleton h-72 w-full"></div>
          <div
            className="skeleton h-72 w-full"
            style={{ animationDelay: "0.05s" }}
          ></div>
          <div
            className="skeleton h-72 w-full"
            style={{ animationDelay: "0.1s" }}
          ></div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-950 pb-20">
          <div className="mx-auto max-w-7xl w-full p-3 xl:px-1 rounded-lg mb-5 md:mb-8 md:mt-2 flex justify-center flex-col md:flex-row gap-4">
            <div className="md:max-w-[75%] flex-grow">
              <ImageSlider
                aspectRatio={"16/9"}
                title={"Alibuy | SALA"}
                rounded={true}
                loop={false}
                perViewMobile={1}
                perView={1}
                images={[
                  {
                    img: "/img/1690x1000-apple-pro-banner-image.jpg",
                    to: "/products/53/آیفون 16",
                  },
                  {
                    img: "/img/photo_1625766763788_95dcce9bf5ac.jpg",
                    to: "/products/49/مک‌بوک",
                  },
                  // {
                  // img: "/img/macbook-pro-2023-01.jpg",
                  //   to: "/products/49/مک‌بوک ایر",
                  // },
                  // {
                  //   img: "/img/IMG_0528-3-2048x1131.webp",
                  //   to: "/products/61/آیفون15پرو",
                  // },
                ]}
              />
            </div>
            <div className="md:w-[20%] flex flex-row justify-between mb-4 max-md:mt-4 md:flex-col gap-4">
              {/* {[1, 2].map((x) => ( */}
             
              <Link
                className={`w-[calc(50%-0.5rem)] md:w-full rounded-lg cursor-pointer`}
                to="/products/53/آیفون 16"
              >
                <figure
                // onClick={() => navigate("/s/kavo")}
                >
                  <img
                    src="/img/products/iphone16promax.jpg"
                    alt="Vertical Image 1"
                    className="w-full rounded-lg shadow-md aspect-square"
                  />
                </figure>
              </Link>
              <Link
                className={`w-[calc(50%-0.5rem)] md:w-full rounded-lg cursor-pointer`}
                to="/products/49/مک%E2%80%8Cبوک"
              >
                <figure
                // onClick={() => navigate("/s/kavo")}
                >
                  <img
                    src="/img/products/macbookprom3.png"
                    alt="Vertical Image 1"
                    className="w-full rounded-lg shadow-md aspect-square"
                  />
                </figure>
              </Link>
              {/* ))} */}
            </div>

            {/* <div
              className="hero min-h-[650px] max-w-6xl w-full mx-auto rounded-lg "
              style={{
                backgroundImage: "url(/img/home2.jpg)",
              }}
            >
              <div className="hero-overlay bg-black/40 rounded-lg"></div>
              <div className="hero-content w-full text-neutral-content text-center rounded-lg py-5 px-0">
                <div className="w-full bg-black/60">
                  <div className=" text-white w-full mx-auto flex flex-col sm:flex-row gap-4 sm:gap-12 items-center justify-center py-4 md:p-6 lg:rounded-l-xl max-lg:rounded-t-xl">
                    <img
                      src="/img/logo.png"
                      alt="Admiral Logo"
                      className="max-w-32"
                    />
                    <div className="flex flex-col items-center gap-6">
                      <p className="text-center text-base md:text-lg font-semibold md:font-bold">
                        التجارة الدولية سالا
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* 
          <div className="mb-6">
            <StoreCategories
              items={[
                "رستوران",
                // "سوپرمارکت",
                "کافه",
                "قنادی نانوایی",
                "میوه",
                "پروتئین",
                "آبمیوه بستنی",
              ]}
            />
          </div> */}

          {products != [] &&
            products.map((productsgroup, index) => (
              <ProductsGroup
                key={index}
                addToCart={addToCart}
                setSheetData={setSheetData}
                title={productsgroup.title}
                id={productsgroup.id}
                items={productsgroup.items}
                // .map((item) => ({
                // ...item,
                // description: (
                //   <div className="flex flex-col gap-4">
                //     {item.description.map((text, index) => (
                //       <p key={index}>{text}</p>
                //     ))}
                //   </div>
                // ),
                // }))}
              />
            ))}

          {/* <div className="m-6">
            <ImageSlider
              images={[
                "/img/gallery (1)-min.jpg",
                "/img/gallery (2)-min.jpg",
                "/img/gallery (3)-min.jpg",
                "/img/gallery (4)-min.jpg",
                "/img/gallery (5)-min.jpg",
                "/img/gallery (6)-min.jpg",
                "/img/gallery (7)-min.jpg",
                "/img/gallery (8)-min.jpg",
              ]}
            />
          </div> */}

          <div
            id="contact"
            className=" flex flex-col-reverse min-[900px]:flex-row justify-center w-full gap-12 xl:gap-0 max-w-7xl px-5 mt-20 mx-auto user-select-none"
          >
            {/* <div className="flex flex-col gap-6 w-full justify-start lg:items-end h-full max-w-lg lg:max-w-sm xl:max-w-md mx-auto">
              <div className="flex flex-col justify-start gap-4 md:mt-8 w-full">
                <h2 className="text-2xl font-bold text-black text-start">
                  ساعات کاری
                </h2>
                <div className="flex flex-col min-[400px]:flex-row gap-6 min-[400px]:gap-3 md:gap-10">
                  <div className="w-full mb-2">
                    {[
                      { title: "دوشنبه", day: "monday" },
                      { title: "سه‌شنبه", day: "tuesday" },
                      { title: "چهارشنبه", day: "wednesday" },
                      { title: "پنج‌شنبه", day: "thursday" },
                      { title: "جمعه", day: "friday" },
                      { title: "شنبه", day: "saturday" },
                      { title: "یک‌شنبه", day: "sunday" },
                    ].map((d, idx) => (
                      <div
                        key={idx}
                        className={`${
                          moment().format("dddd").toLowerCase() === d.day
                            ? "font-bold "
                            : "font-normal"
                        } ${
                          idx != 6 && "mb-2"
                        } text-gray-700 py-2 flex flex-col- -min-[374px]: flex-row gap-2 text-sm sm:text-base`}
                      >
                        <p className="w-full- min-[374px]: w-1/3">{d.title}</p>
                        <div className="flex flex-col gap-1 w-full  min-[374px]:w-2/3 text-start">
                          <span style={{ direction: "ltr" }}>
                            {d.day == "sunday"
                              ? "بسته"
                              : "10:00 – 20:00"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-12 md:gap-8">
              <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg max-md:mt-6 mx-auto w-full lg:min-w-1/2 justify-start gap-4">
                <div className="flex flex-col justify-start gap-4">
                  <h2 className="text-2xl font-bold text-black text-start">
                    عنوان المكتب في دبي
                  </h2>
                  <p className="text-base font-normal text-gray-500">
                    
                الإمارات العربية المتحدة، دبي، شارع الرقة، مركز الأعمال الرقة، الطابق الثالث، المكتب 47
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full justify-start lg:items-end h-full max-w-lg lg:max-w-sm xl:max-w-md min-500:mx-auto">
                <iframe
                  loading="lazy"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Rigga%20Business%20Center,%20Rigga%20St,%20Dubai,%20United%20Arab%20Emirates+(Alibuy)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  title="25.265433933301967, 55.32109513317383"
                  aria-label="25.265433933301967, 55.32109513317383"
                  className="object-cover aspect-square h-full w-full rounded-lg"
                ></iframe>
                {/* max-sm:mx-auto max-h-[22rem] max-w-[22rem] lg:max-h-[25rem] lg:max-w-[25rem] */}
              </div>
            </div>
            <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-12 md:gap-8">
              <div className="flex flex-col justify-start gap-4 max-md:mt-6">
                <h2 className="text-2xl font-bold text-black text-start">
                  اتصل بنا
                </h2>
                <div className="flex flex-col gap-2 w-full md:w-1/2">
                  {/* <h2 className="text-base font-bold text-black">Whatsapp</h2> */}
                  <a
                    style={{ direction: "ltr" }}
                    href="tel:+971503123038"
                    className="text-base font-semibold text-block text-gray-700 text-end"
                  >
                    +971 503 123 038
                  </a>
                </div>
                <p className="text-base font-normal text-gray-500">
                  
                سوف يكون زملاؤنا في قسم الدعم الفني سعداء بمساعدتكم في الإجابة على جميع استفساراتكم.
            
                </p>

                <div className="flex flex-col gap-5">
                  {/* <div className="flex flex-col gap-2 w-full items-end">
                    <a
                      target="_blank"
                      href="https://instagram.com/alibuy.co"
                      className="btn min-w-44 hover:scale-95 !text-[#00796a] transition-all text-base font-semibold text-block flex flex-row max-w-40 md:max-w-64 items-center"
                    >
                      <BsInstagram className="size-6 ml-1 inline text-[#00796a]" />
                      اینستاگرام
                    </a>
                  </div> */}

                  {/* <div className="flex flex-col gap-2 w-full items-end">
                    <a
                      target="_blank"
                      href="https://t.me/alibuyco"
                      className="btn min-w-44 hover:scale-95 !text-[#00796a] transition-all text-base font-semibold text-block flex flex-row max-w-40 md:max-w-64 items-center"
                    >
                      <FaTelegram className="size-6 ml-1 inline text-[#00796a]" />
                      تلگرام
                    </a>
                  </div> */}
                  {/* <div className="flex flex-col gap-2 w-full items-end">
                    <a
                      target="_blank"
                      href="https://wa.me/971503123038"
                      className="btn min-w-44 hover:scale-95 !text-[#00796a] transition-all text-base font-semibold text-block flex flex-row max-w-40 md:max-w-64 items-center"
                    >
                      <IoLogoWhatsapp className="size-6 ml-1 inline text-[#00796a]" />
                      واتسپ
                    </a>
                  </div> */}
                  {/* <div className="flex flex-col gap-2 w-full items-end">
                    <a
                      href="mailto:info@alibuy.co"
                      className="btn min-w-44 hover:scale-95 !text-[#00796a] transition-all text-base font-semibold text-block flex flex-row max-w-40 md:max-w-64 items-center"
                    >
                      <MdOutlineAlternateEmail className="size-6 ml-1 inline text-[#00796a]" />
                      ایمیل
                    </a>
                  </div> */}
                </div>

                {/* <hr /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
