import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
    idProduct: number;
    thumbnail: string;
    name: string;
    price: number;
    status: string;
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
    });

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        try {
            const response = await axios.get<Product>(`${import.meta.env.VITE_APP_ENV}/product/${id}`);
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
            <h1>Update Product</h1>
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
                        <option value="STOCK">OUT OF STOCK</option>
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
