import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, hideFooter = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg dark:bg-brand-darkBg text-brand-text dark:text-brand-darkText transition-colors duration-200">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
