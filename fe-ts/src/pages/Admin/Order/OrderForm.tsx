import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export interface Order {
    idOrder?: number;
    priceOrder: number;
    customer: string;
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

const OrderForm = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order>({
        priceOrder: 0,
        customer: '',
        timestamp: new Date(),
        status: '',
        address: '',
        note: '',
        company: '',
        phone: '',
        listDetailOrder: [],
    });

    useEffect(() => {
        if (id) {
            loadOrder();
        }
    }, [id]);

    const loadOrder = async () => {
        // Lấy đơn hàng theo ID
        const result = await axios.get<Order>(`${import.meta.env.VITE_APP_ENV}/order/${id}`);
        setOrder(result.data);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrder((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (id) {
            await axios.put(`${import.meta.env.VITE_APP_ENV}/order/${id}`, order);
        } else {
            await axios.post(`${import.meta.env.VITE_APP_ENV}/order/add`, order);
        }
        navigate('/admin/orders');
    };

    function handleDetailOrderChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const { value } = event.target;
        setOrder((prevOrder) => {
            const updatedListDetailOrder = [...prevOrder.listDetailOrder];
            updatedListDetailOrder[index] = {
                ...updatedListDetailOrder[index],
                quantity: parseInt(value),
            };
            return { ...prevOrder, listDetailOrder: updatedListDetailOrder };
        });
    }

    return (
        <div className="container">
            <h1>{id ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="priceOrder">Tổng giá trị</label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceOrder"
                        name="priceOrder"
                        value={order.priceOrder}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customer">Khách hàng</label>
                    <input
                        type="text"
                        className="form-control"
                        id="customer"
                        name="customer"
                        value={order.customer}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="timestamp">Ngày đặt hàng</label>
                    <input
                        type="date"
                        className="form-control"
                        id="timestamp"
                        name="timestamp"
                        value={order.timestamp.toISOString().substr(0, 10)}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Trạng thái</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={order.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="note">Ghi chú</label>
                    <input
                        type="text"
                        className="form-control"
                        id="note"
                        name="note"
                        value={order.note}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Công ty</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={order.company}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="listDetailOrder">Chi tiết đơn hàng</label>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.listDetailOrder.map((detailOrder, index) => (
                                <tr key={index}>
                                    <td>{detailOrder.product.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={detailOrder.quantity}
                                            onChange={(event) => handleDetailOrderChange(event, index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="submit" className="btn btn-primary">
                    Lưu
                </button>
            </form>
        </div>
    );
   
};
export default OrderForm;
