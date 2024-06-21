import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
interface Customer {
    email?: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
}

const AddCustomer = () => {
    const [customer, setCustomer] = useState<Customer>({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: '',
    });

    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Thêm khách hàng
        await axios.post(`${import.meta.env.VITE_APP_ENV}/add/customer`, customer);
        navigate('/admin/listCustomer');
    };

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
            <h1>Thêm khách hàng</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={customer.firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={customer.lastName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        type="text"
                        className="form-control"
                        id="role"
                        name="role"
                        value={customer.role}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Thêm
                </button>
            </form>
        </div>
    );
};

export default AddCustomer;