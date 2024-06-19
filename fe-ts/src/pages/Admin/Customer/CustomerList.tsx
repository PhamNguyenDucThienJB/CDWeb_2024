import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface Customer {
    idCustomer?: number;
    email?: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
    
}

const CustomerList = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        // lấy tất cả khách hàng
        const result = await axios.get<Customer[]>(`${import.meta.env.VITE_APP_ENV}/allCustomers`);
        setCustomers(result.data);
    };

    const deleteProduct = async (id: number) => {
        // Xóa khách hàng theo ID
        await axios.delete(`${import.meta.env.VITE_APP_ENV}/customer/${id}`);
        loadProducts();
    };
    console.log(customers.map(product => console.log(product)));

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
            <h1>Danh sách khách hàng</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.idCustomer}>
                            <td>{customer.idCustomer}</td>
                            <td>{customer.email}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.role}</td>
                            
                            <td>
                                <Link to={`/admin/updateCustomer/${customer.idCustomer}`} className="btn btn-primary mr-2">
                                    Sửa
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteProduct(customer.idCustomer!)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin/addCustomer" className="btn btn-success">
                Thêm khách hàng
            </Link>
        </div>
    );
};

export default CustomerList;
