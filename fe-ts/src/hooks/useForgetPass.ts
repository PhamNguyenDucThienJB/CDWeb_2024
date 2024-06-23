import { useContext } from "react";
import { ForgetPassContext, ForgetPassContextProps } from "@/context/ForgetPassContext";

function useForgetPass(): ForgetPassContextProps {
  return useContext(ForgetPassContext);
}

export default useForgetPass;