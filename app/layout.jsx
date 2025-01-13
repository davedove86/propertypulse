import '@/assets/styles/globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
