import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import SavedJobs from './components/SavedJobs'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from './utils/constant'
import { useEffect } from 'react'
import { setLoading, setUser } from './redux/authSlice'
import Layout from './components/Layout';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,   // MAIN LAYOUT
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/jobs',
        element: <Jobs />
      },
      {
        path: '/browse',
        element: <Browse />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/saved',
        element: <SavedJobs />
      },
      {
        path: '/description/:id',
        element: <JobDescription />
      },

      // admin routes
      {
        path: "/admin/companies",
        element: <ProtectedRoute><Companies /></ProtectedRoute>
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute><PostJob /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/:id",
        element: <ProtectedRoute><PostJob /></ProtectedRoute>
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: <ProtectedRoute><Applicants /></ProtectedRoute>
      },
    ]
  },

  // Auth routes (NO navbar)
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   },
//   {
//     path: "/jobs",
//     element: <Jobs />
//   },
//   {
//     path: "/description/:id",
//     element: <JobDescription />
//   },
//   {
//     path: "/browse",
//     element: <Browse />
//   },
//   {
//     path: "/profile",
//     element: <Profile />
//   },
//   {
//     path: "/saved",
//     element: <SavedJobs />
//   },

//   //  admin routes
//   {
//     path: "/admin/companies",
//     element: <ProtectedRoute><Companies /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/create",
//     element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/:id",
//     element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs",
//     element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/create",
//     element: <ProtectedRoute><PostJob /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id",
//     element: <ProtectedRoute><PostJob /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id/applicants",
//     element: <ProtectedRoute><Applicants /></ProtectedRoute>
//   },

// ])

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, {
          withCredentials: true
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.log("User not logged in");
        } else {
          console.error(error);
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
