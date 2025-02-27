import'../node_modules/bootstrap/dist/css/bootstrap.min.css'
import'../node_modules/bootstrap/dist/js/bootstrap'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut';
import { lazy } from 'react'
import { Suspense } from 'react'

function App() {

      const Home =lazy(()=>import('./components/Home/Home'))
      const Login =lazy(()=>import('./components/Login/Login'))
      const Register =lazy(()=>import('./components/Register/Register'))
      const Error =lazy(()=>import('./components/Error/Error'))
      const Cart =lazy(()=>import('./components/Cart/Cart'))
      const Category =lazy(()=>import('./components/Category/Category'))
      const PoductDetails =lazy(()=>import('./components/PoductDetails/PoductDetails'))

    const routs =createBrowserRouter([
        {path:"", element:<LayOut /> ,children:[
        {path:"", element: <Suspense > <Home /></Suspense>},
        {path:"home", element:<Suspense > <Home /></Suspense>},
        {path:"login", element:<Suspense><Login /></Suspense>},
        {path:"register", element:<Suspense><Register /></Suspense>},
        {path:"cart", element:  <Suspense><Cart /></Suspense>},
        {path:"category", element:<Category />},
        {path:"PoductDetails/:id", element: <Suspense><PoductDetails /></Suspense>},

        {path:"*", element:  <Suspense><Error /></Suspense>},

        ]}

    ])
  return (
    <>
    <RouterProvider router={routs}>

    </RouterProvider>
    </>
  )
}

export default App
