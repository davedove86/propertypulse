import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'real estate, property, home, house, apartment, rent, buy, sell',
  description:
    'Property Pulse is a real estate platform that helps you find your perfect rental home.',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html>
          <body className='flex flex-col min-h-screen'>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
