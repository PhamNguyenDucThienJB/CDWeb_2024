import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
    idProduct: number;
    thumbnail: string;
    name: string;
    price: number;
    status: string;
    description: string;
    branch_id: string;
    quantity: number;
    priceSale: number;
}

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product>({
        idProduct: 0,
        thumbnail: '',
        name: '',
        price: 0,
        status: '',
        description: '',
        branch_id: '',
        quantity: 0,
        priceSale: 0
    });

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const response = await axios.get<Product>(`${import.meta.env.VITE_APP_ENV}/product/${id}`);
            console.log(response.data); // Kiểm tra dữ liệu trả về từ API
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_APP_ENV}/product/${product.idProduct}`, product);
            navigate('/admin/listProduct');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <nav style={{ display: 'ruby-text' }}>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">Trang chủ</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listProduct" className="nav-link">Danh sách sản phẩm</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listCustomer" className="nav-link">Danh sách khách hàng</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/listOrder" className="nav-link">Danh sách đơn hàng</Link>
                    </li>
                </ul>
            </nav>
            <h1>Thêm Sản Phẩm</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Thumbnail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        name="thumbnail"
                        value={product.thumbnail}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priceSale">Price Sale</label>
                    <input
                        type="number"
                        className="form-control"
                        id="priceSale"
                        name="priceSale"
                        value={product.priceSale}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="branch_id">Branch ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="branch_id"
                        name="branch_id"
                        value={product.branch_id}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={product.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="OUT OF STOCK">OUT OF STOCK</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
