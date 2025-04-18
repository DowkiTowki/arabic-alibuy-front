import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProgressiveImage from "../../helpers/ProgressiveImage";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 10, origin: "center" },
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
        className={`navigation-wrapper h-fit w-full flex items-center max-w-screen-lg mx-auto  relative ${
          props.rounded == true && "min-[520px]:rounded"
        }`}
      >
        {props.images.length > 1 && (
          <Arrow
            onClick={(e) => e.stopPropagation() || instanceRef.current.prev()}
            // disabled={currentSlide === 0}
          />
        )}
        <div
          ref={sliderRef}
          className={`keen-slider w-full ${props.rounded == true && "rounded"}`}
        >
          {props.images.map((img, idx) => (
            <figure
              key={idx}
              onClick={() => navigate(img.to)}
              className={`keen-slider__slide w-full shadow-lg ${
                props.rounded == true && "rounded"
              } cursor-pointer`}
            >
              {/* <div className="keen-slider__slide "> */}
              {/* <img
                            src={props.image}
                            alt={props.name}
                            style={{width: "100%", height: "100%"}}
                        /> */}

              <ProgressiveImage
                aspectRatio="16 / 9"
                className={`w-full shadow-lg`}
                src={img.img}
                alt={`SALA ${props.title}`}
                placeholder="./img/noimg.png"
              />

              {/* </div> */}
            </figure>
          ))}
        </div>
        {props.images.length > 1 && (
          <Arrow
            left
            onClick={(e) => e.stopPropagation() || instanceRef.current.next()}
            // disabled={
            //     currentSlide ===
            //     instanceRef.current.track.details.slides.length - 1
            // }
          />
        )}
      </div>
      {loaded && instanceRef.current && props.images.length > 1 && (
        <div className="dots !mt-3">
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
      className={`!size-8 md:!size-10 py-1 translate-y-1/5 hdden lg:inline-block arrow z-1 rounded-full bg-[#00796a]/10 text-gray-700/60 dark:text-white/60 absolute
      ${props.left ? "left-2 pr-1" : "right-2 pl-1"}
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
