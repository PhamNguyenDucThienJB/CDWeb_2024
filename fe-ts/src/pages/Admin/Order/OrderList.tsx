import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Customer } from '../Customer/CustomerList';

    export interface Order {
        idOrder?: number;
        priceOrder: number;
        customer: Customer;
        timestamp: Date;
        status: string;
        address: string;
        note: string;
        company: string;
        phone: string;
        listDetailOrder: DetailOrder[];
    }

  

export interface DetailOrder {
    idDetailOrder?: number;
    quantity: number;
    product: Product;
}

export interface Product {
    idProduct?: number;
    thumbnail?: string;
    name: string;
    price: number;
    status: string;
}

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const result = await axios.get<Order[]>('http://localhost:8080/allOrders'); // Thay bằng URL API của bạn
            console.log('Orders:', result.data); // Log dữ liệu trả về
            setOrders(result.data);
        } catch (error) {
            console.error('Error loading orders:', error); // Log lỗi nếu có
        }
    };
    

    const deleteOrder = async (id: number | string) => {
        // Xóa đơn hàng theo ID
        await axios.delete(`${import.meta.env.VITE_APP_ENV}/order/${id}`);
        loadOrders();
        console.log("DELETE" + id);
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
            `<h1>Danh sách đơn hàng</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Ngày đặt hàng</th>
                        <th>Tổng giá trị</th>
                        <th>Trạng thái</th>
                        <th>Chỉnh Xửa</th>
                    </tr>
                </thead>
                `<tbody>
                    {orders.map((order) => (
                        <tr key={order.idOrder}>
                            <td>{order.idOrder}</td>
                            {/* <td>{order.customer.firstName}</td> */}
                            <td>{order.idOrder}</td>
                            <td>{new Date(order.timestamp).toLocaleDateString('vi-VN')}</td>
                            <td>{order.priceOrder}</td>
                            <td>{order.status}</td>
                            <td>
                                <Link to={`/admin/updateOrder/${order.idOrder}`} className="btn btn-primary mr-2">
                                   Sửa
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteOrder(order.idOrder!)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>`
            </table>
            <Link to="/admin/addOrder" className="btn btn-success">
                Thêm đơn hàng
            </Link>`
        </div>
    );
};
export default OrderList;
