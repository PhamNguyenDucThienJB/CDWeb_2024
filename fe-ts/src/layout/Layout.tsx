import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import ApplicationProvider from '@/context/ApplicationProvider';
import Footer from '@/components/Footer/Footer';

function Layout(): JSX.Element {
    return (
        <div>
            <ApplicationProvider>
                <Header />
                <Outlet />
                <Footer />
            </ApplicationProvider>
        </div>
    );
}
export default Layout;
