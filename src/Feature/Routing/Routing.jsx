import { SmileySad } from '@phosphor-icons/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/Admin/AdminHome';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import UserProfile from '../../pages/User/UserProfile';
import UserActivity from '../../pages/UserActivity/UserActivity';
import Private from '../Private/Private';
import UserHome from '../../pages/User/UserHome';
import PublicRoute from '../Private/PublicRoute';
import AdminProfile from '../../pages/Admin/AdminProfile';

export default function Routing() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Private><AdminHome /></Private>}
      />
      <Route
        exact
        path="/useractivity"
        element={<Private><UserActivity /></Private>}
      />
      <Route
        exact
        path="/useractivity/:id"
        element={<Private><UserActivity /></Private>}
      />
      <Route
        exact
        path="/userProfile"
        element={<UserProfile />}
      />
      <Route
        exact
        path="/Adminprofile"
        element={<AdminProfile />}
      />
      <Route
        exact
        path="/login"
        element={<Login />}
      />
      <Route
        exact
        path="/register"
        element={<Register />}
      />
      <Route
        exact
        path="/home"
        element={<PublicRoute><UserHome /></PublicRoute>}
      />
      <Route
        path="*"
        element={(
          <div className="mt-48 flex lg:flex-row flex-col justify-center items-center gap-4">
            <div>
              <SmileySad size={200} />
            </div>
            <div>
              <p className="text-center m-auto text-[200px] text-textPrimary">
                404!
                {' '}
              </p>
            </div>
          </div>
        )}
      />
      {/* <Route
        exact
        path='/profile'
        component={Profile}
      /> */}
    </Routes>
  );
}
