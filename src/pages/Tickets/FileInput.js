import React, { useState } from "react";
import Resizer from "react-image-file-resizer";

export const FileInput = (props) => {
  const [images, setImages] = useState([]);
  // const [img_size, setImgSize] = useState([]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const resizeFile = (file) =>
    new Promise(() => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        "JPEG",
        90,
        0,
        (uri) => {
          // let size = Math.round(((4 * Math.ceil(((uri.length - 'data:image/png;base64,'.length) / 3)) * 0.5624896334383812) / 1000) * 10) / 10;
          // setImgSize(size);
          props.imgUploaded(uri);
        },
        "base64"
      );
    });

  function doSomethingWithFiles(fileList) {
    let file = null;

    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type.match(/^image\//)) {
        file = fileList[i];
        break;
      }
    }

    if (file !== null) {
      const newImages = [];
      newImages.push(URL.createObjectURL(file));
      setImages(newImages);
      resizeFile(file);
      // resizeFile(file).then((resized) => toBase64(resized).then((result) => props.imgUploaded(result)));
      // resizeFile(file).then((resized) => toBase64(resized).then((result) => console.log(result)));
      // props.imgUploaded(file);
    }
  }

  function inputChange(image) {
    const files = image.target.files;
    doSomethingWithFiles(files);
  }

  return (
    <div className="!bg-[#00796a]/20 rounded-lg ">
      <div className="p-3 flex justify-between items-center">
        <label
          htmlFor="img"
          className="flex justify-between items-center w-full"
        >
          <div className="text-sm !text-[#203d3f]">
            <span>تصویر رسید پرداخت</span>
          </div>

          <span className="btn btn-sm min-h-10  !text-[#203d3f] border border-[#203d3f]">
            {images.length > 0 ? (
              <>
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
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                بارگذاری مجدد
              </>
            ) : (
              <>
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
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                بارگذاری
              </>
            )}
          </span>
        </label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          id="img"
          name="img"
          onChange={inputChange}
          // capture={false}
        />
      </div>

      {images.map((image, index) => (
        <div key={index} className="text-left mx-4 mb-4">
          <img
            alt="cam"
            src={image}
            width="200px"
            style={{
              maxWidth: "200px",
              borderRadius: "5px",
              border: "1px solid #eeeeee",
            }}
          />
        </div>
      ))}
    </div>
  );
};
