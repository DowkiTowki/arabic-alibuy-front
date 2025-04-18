import { FaTelegram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
const About = () => {
  return (
    <>
      <div className=" w-full max-w-screen-md mx-auto">
        <div
          id="contact"
          className=" flex flex-col-reverse justify-center w-full gap-12 xl:gap-0 max-w-7xl px-5 mx-auto user-select-none mb-20"
        >
          <div className=" flex flex-col  justify-center w-full gap-4 md:gap-6 max-w-7xl px-5 mt-8 mx-auto user-select-none">
            <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-4">
              <div className="flex flex-col justify-start gap-4">
                <h2 className="text-2xl font-bold text-black text-start">
                معلومات عنا
                </h2>
                <h2 className="text-lg font-medium text-gray-800 text-start">
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
          {/* <div className="flex flex-col max-w-lg lg:max-w-md xl:max-w-lg mx-auto w-full lg:min-w-1/2 justify-start gap-12 md:gap-8">
            <div className="flex flex-col justify-start gap-4 md:mt-6">
              <h2 className="text-2xl font-bold text-black text-start">
                اتصل بنا
              </h2>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default About;
