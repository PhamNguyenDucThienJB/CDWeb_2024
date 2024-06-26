import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export interface Product {
    id?: number;
    thumbnail?: File;
    name: string;
    price: number;
    status: string;
    description: string;
    branch_id: string;
    quantity: number;
    priceSale: number;
}

const ProductForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    status: '',
    description: '',
    branch_id: '',
    quantity: 0 ,// Ensure the key is named correctly
    priceSale: 0 // Ensure the key is named correctly
  });
  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const result = await axios.get<Product>(`${import.meta.env.VITE_APP_ENV}/api/product/${id}`);
    setProduct(result.data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProduct(prevState => ({ ...prevState, thumbnail: file }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('status', product.status);
    formData.append('description', product.description);
    formData.append('branch_id', product.branch_id); // Ensure the key is named correctly
    formData.append('quantity', product.quantity.toString());
    formData.append('priceSale', product.priceSale.toString());
    if (product.thumbnail) {
        formData.append('thumbnail', product.thumbnail);
    }

    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/product/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        navigate('/admin/listProduct');
    } catch (error) {
        console.log('Error adding/updating product:', error);
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
      <h1>{id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input type="file" className="form-control-file" id="thumbnail" name="thumbnail" onChange={handleThumbnailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Giá</label>
          <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Mô tả</label>
          <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="branch_id">Branch ID</label>
          <input type="text" className="form-control" id="branch_id" name="branch_id" value={product.branch_id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Số Lượng</label>
          <input type="number" className="form-control" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="priceSale">Giảm Giá</label>
          <input type="number" className="form-control" id="priceSale" name="priceSale" value={product.priceSale} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select className="form-control" id="status" name="status" value={product.status} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="OUT OF STOCK">OUT OF STOCK</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
};

export default ProductForm;
