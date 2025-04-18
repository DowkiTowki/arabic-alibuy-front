import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 5, origin: "center" },
    loop: true,
    rtl: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`navigation-wrapper w-full flex items-center relative ${
          props.rounded == true && "min-[520px]:rounded-lg"
        }`}
      >
        {/* {props.images.length > 1 && (
          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current.prev()}
            // disabled={currentSlide === 0}
          />
        )} */}
        <div
          ref={sliderRef}
          className={`keen-slider w-full h-fit ${props.rounded == true && "rounded-lg"}`}
        >
          {props.images.map((img, idx) => (
            <figure key={idx}
              // onClick={() => navigate("/s/kavo")}
              className={`keen-slider__slide w-full md:max-h-80 lg:max-h-full h-fit ${
                props.rounded == true && "rounded-lg"
              } cursor-grab`}
            >
              {/* <div className="keen-slider__slide "> */}
              {/* <img
                            src={props.image}
                            alt={props.name}
                            style={{width: "100%", height: "100%"}}
                        /> */}
              <ProgressiveImage
                className={`w-full object-contain md:max-h-80 lg:max-h-full`}
                src={img}
                alt={`SALA ${props.title}`}
                placeholder="/img/noimg.png"
              />

              {/* </div> */}
            </figure>
          ))}
        </div>
        {/* {props.images.length > 1 && (
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current.next()}
            // disabled={
            //     currentSlide ===
            //     instanceRef.current.track.details.slides.length - 1
            // }
          />
        )} */}
      </div>
      {loaded && instanceRef.current && props.images.length > 1 && (
        <div className="dots !my-3">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
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
      className={`size-8 translate-y-1/5 hidden lg:inline-block arrow z-1 text-gray-700/60 dark:text-white/60 absolute
      ${props.left ? "-left-[5%]" : "-right-[5%]"}
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
