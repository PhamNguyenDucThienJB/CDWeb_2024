import { Outlet } from 'react-router-dom';
import ForgetPassProvider from '../../context/ForgetPassContext';
import SwiperForgetPass from './SwiperForgetPass';

function PageForgetPass() {
    return (
        <div className="container-page-register">
            <div className="page-register">
                <SwiperForgetPass />

                <ForgetPassProvider>
                    <Outlet />
                </ForgetPassProvider>
            </div>
        </div>
    );
}
export default PageForgetPass;
