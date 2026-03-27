import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Navbar";
import Footer from "./components/ui/Footer";
import { Outlet } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { getProfile } from "./lib/api";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import OrderReview from "./pages/OrderReview";
import OrderSuccess from "./pages/OrderSuccess";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";


const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/checkout/shipping",
        element: <Shipping />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
      {
        path: "/checkout/review",
        element: <OrderReview />,
      },
      {
        path: "/checkout/success",
        element: <OrderSuccess />,
      },
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
];

const App = ({ router }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decoded = JSON.parse(jsonPayload);
          const userId = decoded.id || decoded.userId;
          if (userId) {
            const data = await getProfile(userId);
            if (data.success) {
              dispatch(setUser(data.user));
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;