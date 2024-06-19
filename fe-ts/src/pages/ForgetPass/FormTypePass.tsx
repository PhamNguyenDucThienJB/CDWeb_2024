import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useForgetPass from '@/hooks/useForgetPass';
import { FIELD_EMPTY, PASSWORD, REQUIRE_EMAIL } from '../../constant/ErrorForm';
import Input from '@/components/Input/Input';
import './forget-pass.css';
import axios from 'axios';

function FormTypeEmailOfPass() {
    const alter = withReactContent(
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        }),
    );
    const refFunc = useRef([]);
    const navigate = useNavigate();
    const useForget = useForgetPass();
    const [valueOfPass, setValue] = useState<string>(' ');
    const [loading, setLoading] = useState<boolean>(false);
    const configEmail = {
        name: 'email',
        label: 'Email*',
        listError: [REQUIRE_EMAIL],
        index: 0,
        repeat: false,
        type: false,
        url: false,
    };
    const configPass = {
        name: 'pass',
        label: 'Mật khẩu*',
        listError: [PASSWORD],
        index: 1,
        repeat: false,
        type: true,
        url: false,
    };
    const configRepeatPass = {
        name: 'repeat',
        label: 'Nhập lại mật khẩu*',
        listError: [FIELD_EMPTY],
        index: 2,
        repeat: { value: valueOfPass },
        type: true,
        url: false,
    };
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let check = true;

        refFunc.current.forEach((func: any) => {
            check = check && func();
        });

        if (check) {
            setLoading(true);
            const formData = new FormData(event.currentTarget);
            const email = formData.get('email')?.toString().trim();
            const pass = formData.get('pass')?.toString();
            const formEmail = true;

            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_ENV}/sendOTP?email=${email}`);

                if (response.data.message === 'oke') {
                    useForget.setForm({ email, pass, formEmail });
                    navigate('/forgetpass/otp');
                    return;
                } else {
                    alter.fire({
                        icon: 'error',
                        title: 'Email không tồn tại !',
                    });
                }
            } catch (error) {
                console.log(error);
                alter.fire({
                    icon: 'error',
                    title: 'Email không tồn tại !',
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const setValueOf = (callback: any) => {
        // eslint-disable-next-line prefer-const
        let value = callback();
        setValue(value);
    };

    return (
        <div className="container-form">
            <div className="form-register-infor">
                <div className="form-header">
                    <h1>Quên mật khẩu</h1>
                    <div className="display-step">
                        <span className="step">1</span>
                        <span className="text">Nhập mật khẩu mới</span>
                        <span className="line"></span>
                        <span className="step-none">2</span>
                        <span className="text">Nhập mã OTP</span>
                    </div>
                </div>
                <p> (*Bắt buộc)</p>
                <form onSubmit={submitForm}>
                    <div className="form-body">
                        <Input config={configEmail as any} refFunc={refFunc}>
                            <i className="fa-solid fa-envelope"></i>
                        </Input>
                        <Input config={configPass as any} refFunc={refFunc} handleInputChangeParent={setValueOf}>
                            <i className="fa-solid fa-key"></i>
                        </Input>
                        <Input config={configRepeatPass as any} refFunc={refFunc}>
                            <i className="fa-brands fa-react"></i>
                        </Input>
                        <div className="back-next">
                            <button
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="back"
                            >
                                Đăng nhập
                            </button>
                            <button type="submit" className="next">
                                {loading ? (
                                    <div className="spinner-border spinner-border-sm" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Tiếp tục'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FormTypeEmailOfPass;
