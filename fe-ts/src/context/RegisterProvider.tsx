/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  email: string;
  pass: string;
  formInFor: boolean;
  formEmail: boolean;
}

export interface RegisterContextProps {
  formRegister: FormState;
  setForm: (object: Partial<FormState>) => void;
}

export const RegisterContext = createContext<RegisterContextProps>({
  formRegister: {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    pass: "",
    formInFor: false,
    formEmail: false,
  },
  setForm: () => {},
});

function RegisterProvider({ children }: { children: React.ReactNode }) {
  const form: FormState = {
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    email: "",
    pass: "",
    formInFor: false,
    formEmail: false,
  };
  const [formRegister, setFormRegister] = useState<FormState>(form);
  const setForm = (object: Partial<FormState>) => {
    setFormRegister({ ...formRegister, ...object });
  };
  const value = { formRegister, setForm };
  return (
    <RegisterContext.Provider value={value}>
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;