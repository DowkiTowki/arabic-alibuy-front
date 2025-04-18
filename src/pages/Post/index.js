import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosConfig";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
    const { slug } = useParams();
      useEffect(() => {
        getProst();
        window.scrollTo(0, 0);
      }, []);

    async function getProst() {
      setLoading(true);
      try {
        await axiosInstance
          .post("/posts/" + slug)
          .then((response) => {
            setPost(response.data);
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
  return (
    <>
     {loading ? (
        <div className="w-full max-w-7xl mx-auto mb-20 px-2 mt-5">
          <div
            className="skeleton h-6 w-60 !rounded mb-2"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div className="grid lg:grid-cols-[40%_auto] grid-cols-1 w-full gap-4 lg:gap-5">
            <div className="skeleton aspect-square w-full"></div>
            <div
              className="skeleton min-h-72 h-full w-full"
              style={{ animationDelay: "0.05s" }}
            ></div>
          </div>
        </div>
      ) : (
      <div className=" w-full max-w-screen-md mx-auto">
        <div
          className=" flex flex-col-reverse justify-center w-full gap-12 xl:gap-0 max-w-7xl px-5 mx-auto user-select-none mb-20"
        >
          <div className=" flex flex-col  justify-center w-full gap-4 md:gap-6 max-w-7xl px-5 mt-8 mx-auto user-select-none">
                <h2 className="text-2xl font-bold text-black text-start">
                 {post.title}
                </h2>
            <div dangerouslySetInnerHTML={{__html:post.content}}>
          
            </div>
          </div>
         
        </div>
      </div>)}
    </>
  );
};

export default Post;
