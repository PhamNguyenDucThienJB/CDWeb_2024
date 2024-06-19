import { createContext, useState } from 'react';

interface FormState {
    email: string;
    OTP: string;
    pass: string;
    formEmail: boolean;
}

export interface ForgetPassContextProps {
    form: FormState;
    setForm: (object: Partial<FormState>) => void;
}

export const ForgetPassContext = createContext<ForgetPassContextProps>({
    form: {
        email: '',
        OTP: '',
        pass: '',
        formEmail: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setForm: () => {},
});

function ForgetPassProvider({ children }: { children: React.ReactNode }) {
    const formForget: FormState = {
        email: '',
        OTP: '',
        pass: '',
        formEmail: false,
    };
    const [form, setFormForget] = useState<FormState>(formForget);
    const setForm = (object: Partial<FormState>) => {
        setFormForget({ ...form, ...object });
    };
    const value = { form, setForm };

    return <ForgetPassContext.Provider value={value}>{children}</ForgetPassContext.Provider>;
}

export default ForgetPassProvider;
