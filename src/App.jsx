
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.scss'

import Index from './componentes/index/Inicio'
import Home from './componentes/inicio/Home'
import  Adopciones  from './componentes/Adopciones/Adopciones'
import Donaciones from './componentes/Donaciones/Donaciones'
import Historias from './componentes/Historias/Historias'

const router = createBrowserRouter([

  {
    path: "/",
    element: <Index/>,
    errorElement: <h1>Error + Error = codigo bueno</h1>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Adopciones",
    element: <Adopciones/>,
  },
  {
    path: "/Donaciones",
    element: <Donaciones/>,
  },
  {
    path: "/Historias",
    element: <Historias/>,
  },
])



function App() {
 

  return (
    <RouterProvider router={router} />
  )
}

export default App
