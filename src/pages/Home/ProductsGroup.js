import React, { useRef } from "react";
import SingleProduct from "./SingleProduct";
import { Link } from "react-router-dom";

const ProductsGroup = (props) => {
  const { items, title, setSheetData, addToCart, id } = props;
  // const scrollRef = useRef(null);

  // const scrollLeft = () => {
  //   scrollRef.current.scrollBy({
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // };

  // const scrollRight = () => {
  //   const scrollContainer = scrollRef.current;
  //   scrollContainer.scrollTo({
  //     left: scrollContainer.scrollWidth,
  //     behavior: 'smooth',
  //   });
  //   // scrollRef.current.scrollBy({
  //   //   left: -320,
  //   //   behavior: "smooth",
  //   // });
  // };

  return (
    <>
      <div className="flex flex-col mx-auto max-w-7xl w-full py-5 xl:px-1 mb-5">
        <div className="flex flex-row items-center px-3 justify-between">
          <h2 className="text-xl text-black">{title}</h2>
          <Link
            to={`/products/${id}/${title}`}
            className="btn btn-ghost px-0 font-normal gap-1 hover:text-[#00796a]"
          >
            عرض الكل
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
        </div>
        <div className=" w-40 rounded-lg bg-gradient-to-r mr-3 to-[#00796a] from-transparent p-[2px]"></div>
        {/* <div className="relative">
          <Arrow onClick={(e) => e.stopPropagation() || scrollRight()} /> */}
        <div
          className={`flex overflow-x-auto overflow-y-hidden whitespace-nowrap items-center mt-3 pb-5 px-3`}
          style={{ scrollBehavior: "smooth" }}
          // ref={scrollRef}
        >
          {items.map((i, idx) => (
            <SingleProduct
              key={idx}
              idx={idx}
              addToCart={() => addToCart(i)}
              setSheetData={() => setSheetData(i)}
              i={i}
            />
          ))}
        </div>
        {/* <Arrow left onClick={(e) => e.stopPropagation() || scrollLeft()} />
        </div> */}
      </div>
    </>
  );
};

function Arrow(props) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className={`!size-8 md:!size-10 py-1 translate-y-1/5 hidden lg:inline-block arrow z-1 rounded-full bg-[#00796a]/20 text-gray-600/60 absolute
      ${props.left ? "-left-8 pr-1" : "-right-8 pl-1"}
      `}
    >
      {props.left ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      )}
    </svg>
  );
}

export default ProductsGroup;
