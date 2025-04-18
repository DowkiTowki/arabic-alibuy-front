import { Link } from "react-router-dom";
import { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import Toman from "../../helpers/Toman";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate } from "react-router-dom";
import { TbHelmet } from "react-icons/tb";
import PN from "persian-number";
// import ProductSlider from "./ProductSlider";

const SingleProduct = (props) => {
  const { i, addToCart, idx, isList = false } = props;
  const navigate = useNavigate();
  return (
    <Link
      key={idx}
      // onClick={() => navigate("/product/" + i.id)}
      to={`/product/${i.id}`}
      className={`${
        !isList && "min-w-[20rem] ml-3"
      } card cursor-pointer card-compact bg-base-100 max-w-[22rem] shadow-md hover:shadow-lg hover:scale-[1.01] transition-all`}
    >
      {/* <div className="w-full">
          <ProductSlider
            // aspectRatio={"16/9"}
            title={i.title}
            rounded={true}
            loop={false}
            perViewMobile={1}
            perView={1}
            images={[i.image, i.image, i.image, i.image]}
          />
        </div> */}

      <figure className="mx-6 md:mx-8 md:mt-2">
        <ProgressiveImage
          className="aspect-square rounded-t-2xl user-drag-touch-none"
          // className={`w-full object-contain md:max-h-64 lg:max-h-full`}
          src={i.image}
          alt={`SALA ${i.title}`}
          placeholder="/img/noimg.png"
        />
      </figure>
      <div className="flex absolute top-2 right-2 md:top-4 md:right-4 overflow-x-auto overflow-y-hidden whitespace-nowrap items-center gap-1 mb-2">
        {i.tags ? (
          JSON.parse(i.tags).map((tag, idx) => (
            <div
              key={idx}
              className={`badge ${
                isList && "badge-sm"
              } bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]`}
            >
              {tag}
            </div>
          ))
        ) : (
          <div
            className={`badge ${
              isList && "badge-sm"
            } bg-transparent text-transparent pt-[0.15rem]`}
          ></div>
        )}
        {/* <div className={`badge ${isList && 'badge-sm'} bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]`}>ZAA</div> */}
        {/* <div className={`badge ${isList && 'badge-sm'} bg-[#00796a]/5 text-[#00796a] pt-[0.15rem]`}>
              Not Registered
            </div> */}
      </div>
      <div className="card-body !px-2 !pt-0">
        {/* <h2 className="card-title !mb-0">{i.title}</h2> */}
        <h2
          style={{ textWrap: "auto" }}
          className={`card-title font-normal text-base !mb-0 min-h-14 ${
            isList && "!max-sm:text-base"
          }`}
        >
          {/* {i.title.length} */}
          {i.title.length > 70 ? i.title.substring(0, 65) + "..." : i.title}
        </h2>

        <span className="text-end text-base font-medium">
          {i.isActive == 1 ? (
            <>
              {PN.sliceNumber(i.price)} <small className="text-xs">ر.س</small>
            </>
          ) : (
            <small className="text-sm">غير متوفر</small>
          )}
        </span>
        {/* <div className="flex gap-2 card-actions justify-between mt-2">
            {!isList && (
              <button
                className="btn !border-[#00796a] !bg-[#00796a]   w-[calc(50%-0.25rem)] !text-white hover:scale-[0.98] transition-all"
                // onClick={addToCart}
                onClick={() => navigate("/product/" + i.id + "?toCart=true")}
              >
                افزودن به سبد
              </button>
            )}
            <button
              className={`btn !border-[#00796a] !text-[#00796a]   ${
                isList ? "w-full" : "w-[calc(50%-0.25rem)]"
              } !bg-white hover:scale-[0.98] transition-all`}
              onClick={() => navigate("/product/" + i.id)}
            >
              مشاهده
            </button>
          </div> */}
      </div>
    </Link>
  );
};

export default SingleProduct;
