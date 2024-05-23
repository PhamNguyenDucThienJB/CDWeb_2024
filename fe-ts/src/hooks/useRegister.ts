import { useContext } from "react";
import { RegisterContext, RegisterContextProps } from "@/context/RegisterProvider";

function useRegister(): RegisterContextProps {
  return useContext(RegisterContext);
}

export default useRegister;