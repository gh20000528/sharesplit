import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import SignIn from '../features/signin';
import Home from '../features/home';
import useLoggedInStore from '../store/useLoggedIn';
import User from '../features/userlist/User';

const PrivateRoute = ({children}: {children: React.ReactElement}) => {
  const { isLoggedIn } = useLoggedInStore()
  return isLoggedIn ? children : <SignIn/>
}


const RouterElement = () => (
  <>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
    <Route path="/userList" element={<PrivateRoute><User /></PrivateRoute>} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RouterElement()));

const Router = () => <RouterProvider router={router} />;

export default Router;


