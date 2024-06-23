import withReactContent from 'sweetalert2-react-content';
import localStorageApp from '@/services/LocalStorage';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FIELD_EMPTY, REQUIRE_EMAIL } from '@/constant/ErrorForm';
import { getListError } from '@/services/getListError';
import { useState } from 'react';
import useApplication from '@/hooks/useApplication';
import APIAuthen from '@/services/Authen';
import axios from 'axios';

function FormLogin() {
    const navigate = useNavigate();
    const useApp = useApplication();
    const [loading, setLoading] = useState<boolean>(false);
    const [inputEmail, setInputEmail] = useState({
        value: '',
        listError: getListError([FIELD_EMPTY, REQUIRE_EMAIL]),
        messageError: ' ',
        isError: false,
    });

    const [inputPass, setInputPass] = useState({
        value: '',
        listError: getListError([FIELD_EMPTY]),
        messageError: ' ',
        isError: false,
    });
    const handleFocusEmail = () => {
        setInputEmail({ ...inputEmail, messageError: ' ', isError: false });
    };
    const handleFocusPassword = () => {
        setInputPass({ ...inputPass, messageError: ' ', isError: false });
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail({ ...inputEmail, value: event.target.value });
    };
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPass({ ...inputPass, value: event.target.value });
    };
    const handleBlurEmail = async () => {
        if (validateEmail()) {
            try {
                // Kiểm tra Email đã tồn tại hay chưa
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_ENV}/isExistEmail?email=${inputEmail.value}`,
                );

                if (response.data.message !== 'oke') {
                    setInputEmail({ ...inputEmail, messageError: 'Email không chính xác!', isError: true });
                }
            } catch (error) {
                setInputEmail({ ...inputEmail, messageError: 'Email không chính xác!', isError: true });
                console.log(error);
            }
        }
    };
    const handleBlurPassword = () => {
        validatePass();
    };
    const validateEmail = () => {
        let check = false;
        inputEmail.listError.forEach((func) => {
            if (func(inputEmail.value) === undefined) {
                setInputEmail({ ...inputEmail, messageError: ' ' });
                check = true;
            } else {
                setInputEmail({ ...inputEmail, messageError: func(inputEmail.value) ?? '', isError: true });
                check = false;
                return;
            }
        });
        return check;
    };

    const validatePass = () => {
        let check = false;
        inputPass.listError.forEach((func) => {
            if (func(inputPass.value) === undefined) {
                setInputPass({ ...inputPass, messageError: ' ' });
                check = true;
            } else {
                setInputPass({ ...inputPass, messageError: func(inputPass.value) ?? '', isError: true });
                check = false;
                return;
            }
        });
        // return true
        return check;
    };
    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //  if (validateEmail() & validatePass())
        if (validateEmail() && validatePass()) {
            // eslint-disable-next-line prefer-const
            let formData = new FormData(event.currentTarget);
            // eslint-disable-next-line no-unused-vars
            const email = formData.get('email');
            // eslint-disable-next-line no-unused-vars
            const pass = formData.get('pass');
            login();
        }
    };

    // action login
    const login = () => {
        // eslint-disable-next-line prefer-const
        let form = new FormData();
        form.append('email', inputEmail.value);
        form.append('pass', inputPass.value);
        setLoading(true);
        APIAuthen.signIn(
            (data) => {
                setLoading(true);
                navigate('/home');
                console.log(data.data);
                localStorageApp.setItemStorage('user', JSON.stringify(data.data));
                useApp.logged(data.data);
            },
            () => {
                setLoading(false);
                setInputPass({ ...inputPass, messageError: '', isError: true });
                setInputEmail({ ...inputEmail, messageError: '', isError: true });
                const toast = withReactContent(
                    Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    }),
                );

                toast.fire({
                    icon: 'error',
                    title: 'Thông tin đăng nhập không đúng !',
                });
            },
            form,
        );
    };
    return (
        <div className="container-form">
            <h2>Chào mừng bạn đến với cửa hàng  </h2>
            <h2>Bán Bánh </h2>
            <form onSubmit={submit}>
                <div className={inputEmail.isError ? 'field-email text-err' : 'field-email'}>
                    <input
                        onFocus={handleFocusEmail}
                        onBlur={handleBlurEmail}
                        onChange={handleChangeEmail}
                        className={!inputEmail.isError ? 'input-email' : ' input-email border-err'}
                        placeholder=" "
                        type="text"
                        name="email"
                        id="email"
                        value={inputEmail.value}
                    />
                    <label className={inputEmail.isError ? 'label-email text-err' : 'label-email'} htmlFor="email">
                        Email*
                    </label>
                    <i className="fa-solid fa-envelope-open"></i>
                    <span className="message-error">{inputEmail.messageError}</span>
                </div>
                <div className={inputPass.isError ? 'field-pass text-err' : 'field-pass'}>
                    <input
                        onFocus={handleFocusPassword}
                        onBlur={handleBlurPassword}
                        onChange={handleChangePassword}
                        className={!inputPass.isError ? 'input-pass' : ' input-pass border-err'}
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder=" "
                        value={inputPass.value}
                    />
                    <label className={inputPass.isError ? 'label-pass text-err' : 'label-pass'} htmlFor="pass">
                        Mật khẩu*
                    </label>
                    <i className="fa-solid fa-user-secret"></i>
                    <span className="message-error">{inputPass.messageError}</span>
                </div>

                <div className="register-forgetpass">
                    <Link to={'/forgetpass/typePass'}>Quên mật khẩu </Link>
                    <Link to={'/register/formInFor'}>Bạn chưa có tài khoản?</Link>
                </div>
                <div className="btn-login">
                    <button type="submit">
                        {loading ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Đăng nhập'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default FormLogin;
