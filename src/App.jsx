
import {  Routes, useNavigate, Route } from 'react-router-dom'
import './App.scss'

import Index from './componentes/index/Index'
import Home from './componentes/inicio/Home'
import Adopciones  from './componentes/Adopciones/Adopciones'
import Donaciones from './componentes/Donaciones/Donaciones'
import Historias from './componentes/Historias/Historias'
import NotFound from './page/NotFound'
import { supabase } from './supabase/client'
import { useEffect } from 'react'
import HomeLayout from './componentes/inicio/HomeLayout'
import PrivateRoute from './PrivateRoute'







//  const router = createBrowserRouter([

// {
//     path: "/",
// element: <Index/>,
// errorElement: <h1>Error + Error = codigo bueno</h1>,
// },
// {
//     path: "/Home",
// element: <Home/>,
// },
// {
//     path: "/Adopciones",
// element: <Adopciones/>,
// },
// {
//     path: "/Donaciones",
// element: <Donaciones/>,
// },
// {
//     path: "/Historias",
// element: <Historias/>,
// },

// {
//   path: "*",
// element: <NotFound/>,
// }
// ])



function App() {
 
  const navigate = useNavigate();

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     navigate(session ? '/Home' : '/');
  //   });
  // }, [navigate]);

  useEffect(() => {
    const { data: authListener  } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/Home');
      } else {
        navigate('/');
      }
    });

    authListener.subscription.unsubscribe()
  }, [navigate])
    
  return (
    <div>
   {/* <Routes>
     <Route path="/" element={<Index />} />
     <Route   path="Home" element={<HomeLayout />}>
     <Route index   element={<Home />} />
      <Route path="Adopciones" element={<Adopciones />} />
      <Route path="Donaciones" element={<Donaciones />} />
      <Route path="Historias" element={<Historias />} />
      </Route>
  
   <Route path="*" element={<NotFound />} />
   </Routes> */}
   <Routes>
        <Route path="/" element={<Index />} />
        <Route element={<PrivateRoute />}>
          <Route path="Home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="Adopciones" element={<Adopciones />} />
            <Route path="Donaciones" element={<Donaciones />} />
            <Route path="Historias" element={<Historias />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
   </div>
  )
}

export default App
