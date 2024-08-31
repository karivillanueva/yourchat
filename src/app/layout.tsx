import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Bounce, ToastContainer } from 'react-toastify';

import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YourChat',
  description: 'Karime Villanueva project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Header />
        <main className="h-[calc(100vh-44px)]">
          <>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Bounce}
              theme="light"
            />
          </>
        </main>
      </body>
    </html>
  );
}
