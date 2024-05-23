import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useApplication from '@/hooks/useApplication';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useRef, useState } from 'react';
import { FIELD_EMPTY, PASSWORD } from '@/constant/ErrorForm';
import Input from '@/components/Input/Input';
import avatar from '@/assets/Image/user-img.png';
import axios from 'axios';

function ChangePass() {
    const location = useLocation();
    const useApp = useApplication();

    const alter = withReactContent(Swal);
    const navigate = useNavigate();

    // const location = useLocation();
    const refFunc = useRef([]);

    const [valueOfPass, setValue] = useState<string>('');

    const configPass = {
        name: 'pass',
        label: 'Nhập mật khẩu hiện tại*',
        listError: [PASSWORD, FIELD_EMPTY],
        index: 0,
        repeat: false,
        type: true,
        url: false,
    };
    const configNewPass = {
        name: 'newpass',
        label: 'Mật khẩu mới*',
        listError: [PASSWORD],
        index: 1,
        repeat: false,
        type: true,
        url: false,
    };
    const configRepeatPass = {
        name: 'repeat',
        label: 'Nhập lại mật khẩu mới*',
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
            console.log(check);
            // eslint-disable-next-line prefer-const
            let formData = new FormData(event.currentTarget);
            // eslint-disable-next-line prefer-const
            let pass = formData.get('pass') ?? '';
            // eslint-disable-next-line prefer-const
            let newpass = formData.get('newpass') ?? '';
            // eslint-disable-next-line prefer-const
            let form = new FormData();

            const id = JSON.parse(sessionStorage.getItem('user') ?? '').idUser;
            form.append('idCus', id);
            form.append('pass', pass);
            form.append('newpass', newpass);

            try {
                // Đổi mật khẩu
                const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/customer/changePass`, form);

                if (response.data.message === 'oke') {
                    alter
                        .fire({
                            icon: 'success',
                            title: 'Đổi mật khẩu',
                            text: 'Đổi mật khẩu thành công',
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate('/pageprofile');
                            }
                        });
                } else {
                    alter
                        .fire({
                            icon: 'error',
                            title: 'Đổi mật khẩu',
                            text: 'Đổi mật khẩu không thành công',
                            allowOutsideClick: false,
                            showConfirmButton: true,
                            confirmButtonText: 'OK',
                        })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate('/pagechangepass');
                            }
                        });
                }
            } catch (error) {
                console.log(error);
                alter.fire({
                    icon: 'error',
                    title: 'Đổi mật khẩu không thành công',
                });
            }
        }
    };

    const setValueOf = (callback: any) => {
        const value = callback();
        setValue(value);
    };
    if (useApp.user === undefined) {
        return <Navigate to={'/'} state={{ from: location }} replace />;
    }

    return (
        <div className="profile-container">
            <div className="part-left">
                <div className="profile-header-left">
                    <Link to={'/pageprofile'} className="avatar-user-link">
                        <div className="user-avatar">
                            <img className="user-avatar-placeholder" src={avatar} alt="" />
                        </div>
                    </Link>
                    <div className="username-head">
                        <div className="username">{JSON.parse(sessionStorage.getItem('user') ?? '').name}</div>
                        <div className="div-edit">
                            <Link to={'/pageprofile'} className="edit">
                                <i className="fa-solid fa-pen"></i>
                                <span className="text-edit">Sửa hồ sơ</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="active">
                    <div className="dropdown">
                        <div className="dropbtn">
                            <i className="fa-solid fa-user"></i>
                            <span className="text-drop">Tài khoản của tôi</span>
                        </div>
                        <div id="1" className="dropdown-content">
                            <Link to={'/pageprofile'}>
                                <span className="text-item">Chỉnh sửa hồ sơ</span>
                            </Link>
                            <Link to={'/pagechangepass'}>
                                <span className="text-item">Đổi mật khẩu</span>
                            </Link>
                        </div>
                    </div>

                    <div className="dropdown">
                        <div className="dropbtn">
                            <i className="fa-solid fa-file-invoice-dollar"></i>
                            <Link style={{ textDecoration: 'none', color: '#111111' }} to={'/history-order'}>
                                <span className="text-drop">Lịch sử mua hàng</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="part-right">
                <div className="profile-right-ui">
                    <div className="profile-change">
                        <div className="title">
                            <h1 className="profile-title">Đổi mật khẩu</h1>
                            <div className="note">
                                Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                            </div>
                        </div>
                        <div className="change-password">
                            <div className="form-change-pass">
                                <p> (*Bắt buộc)</p>
                                <form onSubmit={submitForm}>
                                    <div className="form-body-change-pass">
                                        <Input config={configPass as any} refFunc={refFunc}>
                                            <i className="fa-solid fa-key"></i>
                                        </Input>
                                        <Input
                                            config={configNewPass as any}
                                            refFunc={refFunc}
                                            handleInputChangeParent={setValueOf}
                                        >
                                            <i className="fa-solid fa-key"></i>
                                        </Input>
                                        <Input config={configRepeatPass as any} refFunc={refFunc}>
                                            <i className="fa-brands fa-react"></i>
                                        </Input>

                                        <div className="btnAcceptProfile">
                                            <button className="btnAccept" type="submit">
                                                OK
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePass;
