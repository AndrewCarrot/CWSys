import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import ErrorPage from './components/ErrorPage';
import { 
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import RouterTestComponent from './components/RouterTestComponent';
import ReadPage from './components/ReadPage';
import ClimberProfileComponent from './components/ClimberProfileComponent';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <ReadPage/>
      },
      {
        path: "/Sekcje",
        element: <RouterTestComponent/>
      },
      {
        path: "/Profil",
        element: <ClimberProfileComponent/>
      },
      {
        path: "/Klienci",
        element: <RouterTestComponent/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


