import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'real estate, property, home, house, apartment, rent, buy, sell',
  description:
    'Property Pulse is a real estate platform that helps you find your perfect rental home.',
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
