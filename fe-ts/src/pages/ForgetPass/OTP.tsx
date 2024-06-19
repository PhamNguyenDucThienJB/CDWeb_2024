import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useForgetPass from '@/hooks/useForgetPass';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import InputOTP from './InputOTP';
import axios from 'axios';

function OTP(): JSX.Element {
    const toast = withReactContent(
        Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        }),
    );
    const [loadingReset, setLoadingReset] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');
    const navigate = useNavigate();
    const forgetpass = useForgetPass();
    const location = useLocation();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line prefer-const
        let formData = new FormData(event.currentTarget);
        // eslint-disable-next-line prefer-const
        let form = new FormData();

        let otpStr = '';
        let count = 0;
        formData.getAll('otp').forEach((otp) => {
            otpStr += otp;
            if (otp.length === 0) count++;
        });

        if (count > 0) {
            setErr('Mã OTP bao gồm 6 chữ số');
            return;
        } else {
            setErr('');
        }

        form.append('otp', otpStr);
        form.append('email', forgetpass.form.email);
        form.append('pass', forgetpass.form.pass);

        try {
            // Reset Password
            const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/resetPass`, form);

            if (response.data.message === 'CODE_TIME_OUT') {
                toast.fire({
                    icon: 'error',
                    title: 'Mã OTP đã quá hạn!',
                });
                return;
            }

            if (response.data.message === 'INVALID_OTP') {
                toast.fire({
                    icon: 'error',
                    title: 'Mã OTP không đúng, vui lòng nhập lại!',
                });
                return;
            }

            if (response.data.message === 'oke') {
                const result = await withReactContent(Swal).fire({
                    icon: 'success',
                    title: 'Đổi mật khẩu',
                    text: 'Bạn đã đổi mật khẩu thành công',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: 'Đăng nhập',
                });

                if (result.isConfirmed) {
                    navigate('/');
                }
                return;
            }
        } catch (error) {
            console.log(error);
            toast.fire({
                icon: 'error',
                title: 'Bạn hãy thử lại trong vài phút!',
            });
        }
    };
    const resetOTP = async () => {
        setLoadingReset(true);

        try {
            // Reset mã OTP gửi về mail
            const response = await axios.get(`${import.meta.env.VITE_APP_ENV}/resetOTP?email=${forgetpass.form.email}`);

            if (response.data.message === 'NOT_TIME_OUT') {
                setLoadingReset(false);
                toast.fire({
                    icon: 'warning',
                    title: 'Bạn hãy thử lại trong vài phút!',
                });
                return;
            }

            if (response.data.message === 'oke') {
                setLoadingReset(false);
                toast.fire({
                    icon: 'success',
                    title: 'Bạn đã gửi lại mã OTP thành công',
                });
                return;
            }
        } catch (error) {
            setLoadingReset(false);
            console.log(error);
        }
    };
    if (forgetpass.form.formEmail === false) {
        return <Navigate to={'/forgetpass/typePass'} state={{ from: location }} replace />;
    }
    return (
        <div className="container-form">
            <div className="form-register-infor">
                <div className="form-header">
                    <h1>Quên mật khẩu</h1>
                    <div className="display-step">
                        <span className="step">
                            <i className="fa-solid fa-check"></i>
                        </span>
                        <span className="text">Nhập mật khẩu mới</span>
                        <span className="line"></span>
                        <span className="step-none">2</span>
                        <span className="text">Nhập mã OTP</span>
                    </div>
                </div>
                <span className="note-otp">
                    Mã OTP của bạn đã được gửi về email <br />
                    Kiểm tra email của bạn
                </span>
                <form onSubmit={onSubmit}>
                    <div className="otp-form">
                        <InputOTP />
                        <InputOTP />
                        <InputOTP />
                        <InputOTP />
                        <InputOTP />
                        <InputOTP />
                    </div>
                    <div style={{ display: 'block', fontSize: '20px' }} className="invalid-feedback mb-5">
                        {err}
                    </div>
                    <span className="reset-otp">
                        {loadingReset ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <span onClick={resetOTP}>Gửi lại mã OTP</span>
                        )}
                    </span>
                    <div className="back-next">
                        <button onClick={() => navigate(-1)} className="back">
                            Quay lại
                        </button>
                        <button type="submit" className="next">
                            Hoàn tất
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default OTP;
