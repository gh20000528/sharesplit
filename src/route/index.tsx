import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import SignIn from '../features/signin';
import Home from '../features/home';


const RouterElement = () => (
  <>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/" element={<Home/>} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RouterElement()));

const Router = () => <RouterProvider router={router} />;

export default Router;


