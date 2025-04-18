import { useEffect } from "react";
const Logout = () => {
  function doLogout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userEmail");
    
    window.location.href = "/";
    localStorage.removeItem("returnUrl");
  }

  useEffect(() => {
    doLogout();
  }, []);

  return <></>;
};

export default Logout;
