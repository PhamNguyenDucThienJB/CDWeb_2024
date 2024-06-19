import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import useRegister from '@/hooks/useRegister';
import { FIELD_EMPTY, PASSWORD, REQUIRE_EMAIL } from '../../constant/ErrorForm';
import Input from '@/components/Input/Input';
import Swal from 'sweetalert2';
import './register.css';
import axios from 'axios';

function FormTypeEmail() {
    const alter = withReactContent(Swal);
    const location = useLocation();
    const refFunc = useRef([]);
    const navigate = useNavigate();
    const [valueOfPass, setValue] = useState(' ');
    const register = useRegister();
    const configEmail = {
        name: 'email',
        label: 'Email*',
        listError: [REQUIRE_EMAIL],
        index: 0,
        repeat: false,
        type: false,
        url: { url: 'http://localhost:8080/isExistEmail?email=', type: 'email' },
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
            const formData = new FormData(event.currentTarget);
            const pass = formData.get('pass')?.toString() ?? '';
            const email = formData.get('email')?.toString() ?? '';
            const formEmail = true;
            register.setForm({ pass, email, formEmail });

            try {
                const form = new FormData();
                form.append('firstName', register.formRegister.firstName);
                form.append('lastName', register.formRegister.lastName);
                form.append('phone', register.formRegister.phone);
                form.append('pass', pass);
                form.append('email', email);

                // Đăng kí Khách hàng POST
                const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/customer/register`, form);

                const data = response.data;
                if (data.message === 'oke') {
                    alter
                        .fire({
                            icon: 'success',
                            title: 'Đăng kí tài khoản',
                            text: 'Bạn đăng kí tài khoản không thành công',
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            confirmButtonText: 'Đăng nhập',
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        });
                }
            } catch (error) {
                console.log(error);
                alter.fire({
                    icon: 'error',
                    title: 'Đăng kí không thành công',
                });
            }
        }
    };

    const setValueOf = (callback: any) => {
        const value = callback();
        setValue(value);
    };

    if (register.formRegister.formInFor === false) {
        return <Navigate to={'/register/formInfor'} state={{ from: location }} replace />;
    }

    return (
        <div className="container-form">
            <div className="form-register-infor">
                <div className="form-header">
                    <h1>Đăng kí tài khoản</h1>
                    <div className="display-step">
                        <span className="step">
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className="text">Thông tin cá nhân</span>
                        <span className="line"></span>
                        <span className="step-none">2</span>
                        <span className="text">Nhập email</span>
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
                            <button onClick={() => navigate(-1)} className="back">
                                Quay lại
                            </button>
                            <button type="submit" className="next">
                                Tiếp tục
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FormTypeEmail;
