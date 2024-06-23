import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './profile.css';
import avatar from '@/assets/Image/user-img.png';
import bag from '@/assets/Image/bag.png';
import useApplication from '@/hooks/useApplication';
import axios from 'axios';

function HistoryOrder() {
    const location = useLocation();
    const useApp = useApplication();
    const navigate = useNavigate();

    const [listOrder, setListOrder] = useState<Array<any>>([]);

    const formatDay = (date: Date): string => {
        const array: string[] = date.toLocaleDateString('en-US').split('/');
        return `${array[1]}/${array[0]}/${array[2]}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Tìm kiếm đơn hàng theo ID
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_ENV}/findOrder?id=${
                        JSON.parse(sessionStorage.getItem('user') ?? '').idUser
                    }`,
                );

                const data = response.data;
                if (data.message === 'oke') {
                    setListOrder(data.data);
                    console.log(data.data);
                }
            } catch (error) {
                setListOrder([]);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    if (useApp.user === undefined) {
        return <Navigate to={'/'} state={{ from: location }} replace />;
    }
    return (
        <div className="container-profile-page">
            <div className="profile">
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
                                    <h1 className="profile-title">Thông tin đơn hàng</h1>
                                </div>
                                <div className="change-info-contain">
                                    {listOrder.length === 0 ? (
                                        <>
                                            <div className="text-center p-5">
                                                <img src={bag} alt="bag" style={{ height: '70%', width: '70%' }} />
                                            </div>
                                            <h1 className="display-6 text-center">Đơn hàng trống</h1>
                                            <div className="text-center p-3">
                                                <button
                                                    onClick={() => navigate('/shop')}
                                                    type="button"
                                                    className="btn btn-primary"
                                                >
                                                    Đi đến cửa hàng nào
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="form-profile-info mt-5">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#Order</th>
                                                        <th scope="col">Trạng thái</th>
                                                        <th scope="col">Ngày tạo</th>
                                                        <th scope="col">Tổng tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listOrder.map((order) => (
                                                        <tr>
                                                            <th scope="row">{order.idOrder}</th>
                                                            <td>Đang chờ xử lý</td>
                                                            <td>{formatDay(new Date(order.timestamp + ''))}</td>
                                                            <td>
                                                                {(order.priceOrder + '').replace(
                                                                    /(\d)(?=(\d\d\d)+(?!\d))/g,
                                                                    '$1.',
                                                                )}{' '}
                                                                vnd
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryOrder;
