import { Outlet } from 'react-router-dom';
import SwiperRegister from './SwiperRegister';
import RegisterProvider from '../../context/RegisterProvider';
import './register.css';

function PageRegister() {
    return (
        <div className="container-page-register">
            <div className="page-register">
                <SwiperRegister />
                <RegisterProvider>
                    <Outlet />
                </RegisterProvider>
            </div>
        </div>
    );
}
export default PageRegister;
