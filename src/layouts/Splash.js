import Loader from "./Loader";
export default function Splash() {
  let version = "1.0.0";
  return (
    <div
      id="splash-screen"
      className="fixed user-select-none inset-0 flex flex-col transition-all duration-500 items-center justify-center z-[1000001] h-dvh min-h-full bg-[#fafafa] text-[#00796a]"
    >
      {/* <img
        alt="admiral"
        className="max-w-52 p-3 rounded-xl"
        src="/img/logo.png"
      /> */}
      <b
        // onClick={() => navigate("/")}
        className="font-extrabold text-3xl text-[#00796a]"
      >
        SALA
      </b>
      <div className="absolute bottom-0 text-center z-50 mb-5">
        <div className="block mx-auto">
          <Loader />
        </div>
        {/* <small className="text-base font-bold block mb-1">Admiral</small>  */}
        {/* <small className="text-xs font-mono">v {version}</small> */}
      </div>
    </div>
  );
}
