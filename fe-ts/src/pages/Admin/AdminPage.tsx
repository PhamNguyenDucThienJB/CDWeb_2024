import { Link } from 'react-router-dom';
import './adminPage.css';

const AdminPage = () => {
    return (
        <div className="container">
           
            <nav style={{ display: 'ruby-text' }}>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listProduct" className="nav-link">
                            Danh sách sản phẩm
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listCustomer" className="nav-link">
                            Danh sách khách hàng
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listOrder" className="nav-link">
                            Danh sách đơn hàng
                        </Link>
                    </li>
                </ul>
            </nav>
            <h1>Chào Mừng Admin Đã Quay Trở </h1>
            <h1>Hãy Hoàn Thanh Mọi Sự Một Cách Tốt Đẹp</h1>
        </div>
    );
};

export default AdminPage;
