import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import ErrorPage from './components/ErrorPage';
import { 
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import ReadPage from './components/ReadPage';
import ClimberProfile from './components/ClimberProfile';
import NewClimber from './components/NewClimber'
import AllClimbers from './components/AllClimbers'
import ClassSchedule from './components/ClassSchedule';
import ClassEdit from './components/ClassEdit'
import LoginPage from './components/LoginPage'

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
        element: <ClassSchedule/>
      },
      {
        path: "/Profil",
        element: <ClimberProfile/>
      },
      {
        path: "/Nowy",
        element: <NewClimber/>
      },
      {
        path: "/Lista",
        element: <AllClimbers/>
      },
      {
        path: "/Edycja",
        element: <ClassEdit/>
      }
    ]
  },
  {
    path: "/Login",
    element: <LoginPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


