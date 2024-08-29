import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white font-manrope text-base lg:text-lg 2xl:text-xl font-normal antialiased text-black">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
