import { Provider } from "react-redux";
import { store } from "./services/store";
import Splash from "./layouts/Splash";
// import { Offline, Online } from "react-detect-offline";
// import OfflineComponent from "./layouts/Offline";
// import CheckVersion from "./components/CheckVersion";
// import PWAPrompt from "react-ios-pwa-prompt";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = ({ children }) => {
  setTimeout(function () {
    document.getElementById("splash-screen").classList.add("hidden");
  }, 3000);

  window.scrollTo(0, 0);
  return (
    <Provider store={store}>
      <Splash />
      {/* <Online polling={false}> */}
      {children}
      <ToastContainer
        className="!mt-9 max-[480px]:!mt-14 !z-[1001] "
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        limit={2}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={document.documentElement.getAttribute("data-theme")}
        toastClassName="!z-[1001] !mx-4 !backdrop-blur-md !bg-white/70 !text-black dark:!bg-gray-950/70 dark:!text-white"
        // transition= 'Slide'
      />
      {/* </Online> */}
      {/* <Offline polling={false}> */}
      {/* <OfflineComponent /> */}
      {/* </Offline> */}
    </Provider>
  );
};

export default Root;
