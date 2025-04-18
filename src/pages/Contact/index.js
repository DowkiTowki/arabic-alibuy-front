import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";

import moment from "moment";
const Contact = () => {
  return (
    <>
      <div className=" w-full max-w-screen-md mx-auto">
        <div
          id="contact"
          className=" flex flex-col justify-center w-full gap-12 xl:gap-0 max-w-7xl px-5 mx-auto user-select-none mb-20"
        >
          <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-12 md:gap-8">
            <div className="flex flex-col justify-start gap-4 mt-6">
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
                    إنستغرام
                  </a>
                </div> */}

                {/* <div className="flex flex-col gap-2 w-full items-end">
                  <a
                    target="_blank"
                    href="https://t.me/alibuyco"
                    className="btn min-w-44 hover:scale-95 !text-[#00796a] transition-all text-base font-semibold text-block flex flex-row max-w-40 md:max-w-64 items-center"
                  >
                    <FaTelegram className="size-6 ml-1 inline text-[#00796a]" />
                    تلغرام
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
                    البريد الإلكتروني
                  </a>
                </div> */}
              </div>

              {/* <hr /> */}
            </div>
          </div>

          <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-12 md:gap-8">
            <div className="flex flex-col justify-start gap-4 md:mt-8 w-full">
              <h2 className="text-2xl font-bold text-black text-start">
              ساعات العمل
              </h2>
              <div className="flex flex-col min-[400px]:flex-row gap-6 min-[400px]:gap-3 md:gap-10">
                <div className="w-full mb-2">
                  {[
                    { title: "الإثنين", day: "monday" },
                    { title: "الثلاثاء", day: "tuesday" },
                    { title: "الأربعاء", day: "wednesday" },
                    { title: "الخميس", day: "thursday" },
                    { title: "الجمعة", day: "friday" },
                    { title: "السبت", day: "saturday" },
                    { title: "الأحد", day: "sunday" },
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
                          {d.day == "sunday" ? "مغلق" : "10:00 – 20:00"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col  justify-center w-full gap-4 md:gap-6 max-w-7xl px-5 mt-8 mx-auto user-select-none">
            <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-4">
              <div className="flex flex-col justify-start gap-4">
                <h2 className="text-2xl font-bold text-black text-start">
                عنوان المكتب في دبي
                </h2>
                <p className="text-base font-normal text-gray-500">
                الإمارات العربية المتحدة، دبي، شارع الرقة، مركز أعمال الرقة، الطابق الثالث، المكتب 47
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
        </div>
      </div>
    </>
  );
};

export default Contact;
