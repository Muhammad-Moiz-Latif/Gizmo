import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Login } from "./Layouts/Login"
import { UserDashboard } from "./Layouts/UserDashboard"
import { AdminDashboard } from "./Layouts/AdminDashboard"
import { AdminDevices } from "./pages/AdminDevices"
import { AllUsers } from "./pages/AllUsers"
import ApprovalsPage from "./pages/ApprovalPage"
import CategoriesPage from "./pages/CategoriesPage"
import { DeviceDetails } from "./pages/AdminDevicePage"
import { EditDevice } from "./pages/EditDevice"
import { Provider } from "react-redux"
import { store } from "./state/store"
import { ProductsPage } from "./pages/ProductsPage"
import { LandingPage } from "./pages/LandingPage"
import { ProductPage } from "./pages/ProductPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import AdminLandingPage from "./pages/AdminLandingPage"
import { SuccessTransaction } from "./components/SuccessTransaction"
import { AboutUs } from "./pages/AboutUs"
import { FAQ } from "./pages/FAQ"
import { Shipping } from "./pages/Shipping&Returns"
import TermsConditions from "./pages/Terms&Conditions"
import PrivacyPolicy from "./pages/Privacypolicy"
import ContactUs from "./pages/ContactUs"
import UserProfile from "./pages/Profile"
import ShoppingCart from "./pages/ShoppingCart"
import { Toaster } from "react-hot-toast"
import { WishlistPage } from "./pages/Wishlist"


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'Category/:CategoryId',
        element: <ProductsPage />
      },
      {
        path: 'Device/:DeviceId',
        element: <ProductPage />
      },
      {
        path: 'aboutus',
        element: <AboutUs />
      },
      {
        path: 'faq',
        element: <FAQ />
      },
      {
        path: "shipping&returns",
        element: <Shipping />
      },
      {
        path: "terms&conditions",
        element: <TermsConditions />
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />
      },
      {
        path: "contactus",
        element: <ContactUs />
      },
      {
        path: 'cart',
        element: <ShoppingCart />
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      },
      {
        path:"wishlist",
        element:<WishlistPage/>
      }

    ]
  },
  {
    path: "Login", element: <Login />
  },
  {
    path: "success/:UserId/:SessionId", element: <SuccessTransaction />
  },
  {
    path: 'dashboard/:UserId',
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'Category/:CategoryId',
        element: <ProductsPage />
      },
      {
        path: 'Device/:DeviceId',
        element: <ProductPage />
      },
      {
        path: 'aboutus',
        element: <AboutUs />
      },
      {
        path: 'faq',
        element: <FAQ />
      },
      {
        path: "shipping&returns",
        element: <Shipping />
      },
      {
        path: "terms&conditions",
        element: <TermsConditions />
      },
      {
        path: "privacypolicy",
        element: <PrivacyPolicy />
      },
      {
        path: 'contactus',
        element: <ContactUs />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'cart',
        element: <ShoppingCart />
      },
      {
        path: "checkout",
        element: <CheckoutPage />
      },
      {
        path:"wishlist",
        element:<WishlistPage/>

      }
    ]
  },
  {
    path: 'admindashboard',
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminLandingPage />
      },

      {
        path: 'devices',
        element: <AdminDevices />,
      },
      {
        path: 'devices/:id',
        element: <DeviceDetails />
      },
      {
        path: 'devices/editdevice/:id',
        element: <EditDevice />
      },
      {
        path: 'users',
        element: <AllUsers />
      },
      {
        path: 'approvals',
        element: <ApprovalsPage />
      },
      {
        path: 'categories',
        element: <CategoriesPage />
      },
    ]
  }

])

export default function App() {
  return (

    <Provider store={store}>
      <Toaster position="top-center" toastOptions={{
        duration: 2000,
      }} />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}