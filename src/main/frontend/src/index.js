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
import NewClimberComponent from './components/NewClimberComponent'
import AllClimbersComponent from './components/AllClimbersComponent'

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
        path: "/Nowy",
        element: <NewClimberComponent/>
      },
      {
        path: "/Lista",
        element: <AllClimbersComponent/>
      },
      {
        path: "/Edycja",
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


