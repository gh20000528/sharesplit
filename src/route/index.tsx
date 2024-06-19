import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import SignIn from '../features/signin';
import Home from '../features/home';
import useLoggedInStore from '../store/useLoggedIn';
import User from '../features/userlist/User';
import Friend from '../features/friend/Friend';
import Group from '../features/group';
import GroupInfo from '../features/groupInfo';

const PrivateRoute = ({children}: {children: React.ReactElement}) => {
  const isLoggedIn  = useLoggedInStore((state) => state.isLoggedIn)
  return isLoggedIn ? children : <SignIn/>
}


const RouterElement = () => (
  <>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}>
      <Route index element={<Group />} />
      <Route path="group" element={<Group />} />  
      <Route path="friend/:userId" element={<Friend />} />
    </Route>
    <Route path='/group/:groupId' element={<GroupInfo />}/>
    <Route path="/userList" element={<PrivateRoute><User /></PrivateRoute>} />
    
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RouterElement()));

const Router = () => <RouterProvider router={router} />;

export default Router;


