import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa6";

function MegaMenu() {
  const [menuItems, setMenuItems] = useState([
    [
      {
        header: { title: "هواتف/ملحقات", to: null },
        items: [
          { title: "آيفون 16", to: "/products/59/آيفون16" },
          { title: "آيفون 16 برو", to: "/products/60/آيفون16برو" },
          { title: "آيفون 16 بروماكس", to: "/products/36/آيفون16بروماكس" },
          { title: "ملحقات الهواتف", to: "/products/62/ملحقات الهواتف" },
    
          // { title: "آيفون 15", to: "/products/58/آيفون15" },
          // { title: "آيفون 15 برو/بروماكس", to: "/products/61/آيفون15برو" },
        ],
      },
    ],
    [
      {
        header: { title: "المنتجات الرقمية", to: null },
        items: [
          // { title: "تلفزيون", to: "/products/80/تلفزيون" },
          // { title: "ثلاجة وفريزر", to: "/products/81/ثلاجة وفريزر" },
          { title: "ماك بوك", to: "/products/49/ماك بوك" },
          { title: "لابتوب مستعمل", to: "/products/12/لابتوب مستعمل" },
        ],
      },
    ],
    
    
    
    // [
    //   {
    //     header: { title: "مکمل‌ها", to: "/products/63/مکمل‌ها" },
    //     items: [
    //       { title: "رونی کلمن", to: "/products/66/رونی کلمن" },
    //       { title: "کوین لورون", to: "/products/64/کوین لورون" },
    //       { title: "ماسل تک", to: "/products/65/ماسل تک" },
    //       { title: "اپتیموم نوتریشن", to: "/products/67/اپتیموم نوتریشن" },
    //     ],
    //   },
    // ],
    // [
    //   {
    //     header: { title: "ملزومات حیوانات خانگی", to: null },
    //     items: [
    //       { title: "غذای سگ و گربه (به زودی!)", to: null },
    //       { title: "مکمل‌های غذایی (به زودی!)", to: null },
    //       { title: "اسباب بازی (به زودی!)", to: null },
    //     ],
    //   },
    // ],
  ]);
  return (
    <div className="dropdown dropdown-bottom dropdown-hover- max-md:dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn max-md:!min-h-10 shadow-none max-md:!h-10 text-[#203d3f] !bg-transparent border md:border-none !border-[#203d3f] hover:!scale-[0.98] transition-all p-2 md:px-3 rounded"
      >
        <span>
          <FaList className="size-5 inline md:hidden" />
        </span>
        <span className="max-md:hidden">المنتجات</span>
      </div>
      <ul
        tabIndex={0}
        // style={{ transform: "translateX(-4rem)" }}
        className="dropdown-content menu flex-row w-[calc(100vw-0.15rem)] md:w-[calc(100vw-1rem)] -translate-x-[7rem] md:translate-x-[10rem] xl:translate-x-[5.25rem] p-4 !pt-14 md:p-6 bg-white !backdrop-blur-xl rounded-lg mt-[0.6rem] z-[6] columns-2 md:columns-4 gap-4 max-w-screen-lg shadow"
      >
        {menuItems.map((list) =>
          list.map((item) => (
            <li className="w-[calc(50%-0.5rem)] md:w-[calc(33%-0.75rem)]">
              {item.header.to == null ? (
                <span className="font-semibold !cursor-default !text-[#00796a]">
                  {item.header.title}
                </span>
              ) : (
                <Link
                  to={item.header.to}
                  className="font-semibold text-[#00796a]"
                >
                  {item.header.title}
                </Link>
              )}
              <ul>
                {item.items.map((i) => (
                  <li>
                    {i.to == null ? (
                      <span className="!cursor-default">{i.title}</span>
                    ) : (
                      <Link className="hover:text-[#00796a]" to={i.to}>
                        {i.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MegaMenu;
