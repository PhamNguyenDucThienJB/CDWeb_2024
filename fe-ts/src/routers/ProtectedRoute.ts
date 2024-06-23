// import React, { ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useApplication from '@/hooks/useApplication';

// interface User {
//     idUser: number;
//     [key: string]: any; // Nếu đối tượng user có thêm thuộc tính khác
// }

// interface ProtectedRouteProps {
//     children: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//     const user = useApplication();
//     const navigate = useNavigate();
//     const currentUser: User = JSON.parse(sessionStorage.getItem('user') ?? '{}');

//     if (!currentUser || currentUser.idUser !== 1) {
//         navigate('/home');
//         return null;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;
