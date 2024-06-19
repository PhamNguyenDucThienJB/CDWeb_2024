import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface Product {
    idProduct?: number;
    thumbnail?: string;
    name: string;
    price: number;
    status: string;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        // Lấy tất cả sản phẩm 
        const result = await axios.get<Product[]>(`${import.meta.env.VITE_APP_ENV}/allProducts`);
        setProducts(result.data);
    };

    const deleteProduct = async (id: number) => {
        // Xóa sản phẩm theo ID
        await axios.delete(`${import.meta.env.VITE_APP_ENV}/product/${id}`);
        loadProducts();
    };
    console.log(products.map(product => console.log(product)));

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
            <h1>Danh sách sản phẩm</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.idProduct}>
                            <td>{product.idProduct}</td>
                            <td><img src={product.thumbnail} style={{width: '50px',height: '50px'}} /></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.status}</td>
                            
                            <td>
                                <Link to={`/admin/updateProduct/${product.idProduct}`} className="btn btn-primary mr-2">
                                    Sửa
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteProduct(product.idProduct!)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin/addProduct" className="btn btn-success">
                Thêm sản phẩm
            </Link>
        </div>
    );
};

export default ProductList;
