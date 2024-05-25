import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';

export interface Product {
    id?: number;
    thumbnail?: string;
    name: string;
    price: number;
    status: string;
}

const ProductForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
    status: ''
  });

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    // Thêm sản phẩm theo ID
    const result = await axios.get<Product>(`${import.meta.env.VITE_APP_ENV}/api/product/${id}`);
    setProduct(result.data);
  }

  const handleChange =(event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProduct(prevState => ({ ...prevState, thumbnail: reader.result as string }));
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('status', product.status);
    if (product.thumbnail) {
      const base64String = product.thumbnail.split(',')[1];
      const blob = base64StringToBlob(base64String);
      formData.append('thumbnail', blob, 'thumbnail.png');
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_ENV}/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
  
      const productId = response.data.id;
      if (product.thumbnail) {
        const thumbnailName = `thumbnail-${productId}.png`;
        const thumbnailBlob = base64StringToBlob(product.thumbnail.split(',')[1]);
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnailBlob, thumbnailName);
  
        try {
          await axios.post(`/product/${productId}/thumbnail`, thumbnailFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.log('Error uploading thumbnail:', error);
        }
      }
      navigate('/');
    } catch (error) {
      console.log('Error adding/updating product:', error);
    }
  };
  
  
  const base64StringToBlob = (base64String: string): Blob => {
    const byteString = atob(base64String);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([uintArray], { type: 'image/png' });
  };

  return (
    <div className="container">
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
          <label htmlFor="status">Trạng thái</label>
          <input type="text" className="form-control" id="status" name="status" value={product.status} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Lưu</button>
      </form>
    </div>
  );
}

export default ProductForm;