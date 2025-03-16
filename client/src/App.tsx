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


const router = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to="/dashboard" replace/>
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
        element: <ProductsPage/>
      },
      {
        path: 'Device/:DeviceId',
        element: <ProductPage/>
      },
      {
        path:"checkout",
        element: <CheckoutPage/>
      }
    ]
  },
  {
    path:"Login",element:<Login/>
  },
  {
    path: "success/:UserId/:SessionId", element:<SuccessTransaction/>
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
        element: <ProductsPage/>
      },
      {
        path: 'Device/:DeviceId',
        element: <ProductPage/>
      },
      {
        path:"checkout",
        element: <CheckoutPage/>
      }
    ]
  },
  {
    path: 'admindashboard',
    element: <AdminDashboard />,
    children: [
      {
        index:true,
        element:<AdminLandingPage/>
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
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  )
}