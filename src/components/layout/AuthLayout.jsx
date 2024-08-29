import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { session } = useSelector((state) => state.auth);
  return (
    session?.signedIn ?
      <div className="flex min-h-screen flex-col bg-white font-manrope text-base lg:text-lg 2xl:text-xl font-normal antialiased text-black">
        <Header />
        <Outlet />
        <Footer />
      </div>
      :
      <Navigate to={'/signin'} />
  );
};

export default AuthLayout;
