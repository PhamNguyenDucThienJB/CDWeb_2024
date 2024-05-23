import { Outlet } from 'react-router-dom';
import ApplicationProvider from '@/context/ApplicationProvider';
import Footer from '@/components/Footer/Footer';
import HeaderAdmin from '@/components/Header/HeaderAdmin';

function LayoutAdmin(): JSX.Element {
    return (
        <div>
            <ApplicationProvider>
                <HeaderAdmin />
                <Outlet />
                <Footer />
            </ApplicationProvider>
        </div>
    );
}
export default LayoutAdmin;
