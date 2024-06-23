import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const UpdateOrder: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order>({
        priceOrder: 0,
        customer: {
            firstName: '',
            lastName: '',
            phone: '',
            role: ''
          },
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
        try {
            const response = await axios.get<Order>(`${import.meta.env.VITE_APP_ENV}/order/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error loading order:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrder((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (id) {
                await axios.put(`${import.meta.env.VITE_APP_ENV}/order/${id}`, order);
            } else {
                await axios.post(`${import.meta.env.VITE_APP_ENV}/order/add`, order);
            }
            navigate('/admin/listOrder');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    const handleDetailOrderChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        setOrder((prevOrder) => {
            const updatedListDetailOrder = [...prevOrder.listDetailOrder];
            updatedListDetailOrder[index] = {
                ...updatedListDetailOrder[index],
                quantity: parseInt(value),
            };
            return { ...prevOrder, listDetailOrder: updatedListDetailOrder };
        });
    };

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
            value={order.priceOrder}
            onChange={handleChange}
          />
        </div>
        {/* Add more form fields here */}
        <button type="submit" className="btn btn-primary">
          Lưu
        </button>
      </form>
    </div>
    );
};

export default UpdateOrder;
