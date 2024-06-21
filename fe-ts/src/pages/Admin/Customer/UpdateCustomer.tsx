import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
export interface Customer {
  idCustomer: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

const UpdateCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Customer>({
    idCustomer: 0,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
  });


  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get<Customer>(`${import.meta.env.VITE_APP_ENV}/customer/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_APP_ENV}/customer/${id}`, user);
      // Handle successful update, e.g., show a success message or navigate to another page
    } catch (error) {
      console.error(error);
    }
  };
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//         await axios.put(`http://localhost:8080/update/customer/${id}`, user, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         // Handle successful update, e.g., show a success message or navigate to another page
//     } catch (error) {
//         console.error(error);
//     }
// };

  console.log("USER UPDATE" + user.email);

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
      <h1>Update Customer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update User
        </button> 
      </form>
    </div>
  );
};

export default UpdateCustomer;
