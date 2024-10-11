import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Paths from "./constants/Paths";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Partner from "./pages/Partner";
import UserSession from "./components/UserSession";
import NotLoggedIn from "./components/NotLoggedIn";

function App() {
  return (
    <>
      <Provider store={store}>
        <UserSession>
          <BrowserRouter>
            <Routes>
              <Route
                path={Paths.Home}
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path={Paths.Admin}
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path={Paths.User}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path={Paths.Partner}
                element={
                  <ProtectedRoute>
                    <Partner />
                  </ProtectedRoute>
                }
              />
              <Route
                path={Paths.Login}
                element={
                  <NotLoggedIn>
                    <Login />
                  </NotLoggedIn>
                }
              />
              <Route
                path={Paths.Register}
                element={
                  <NotLoggedIn>
                    <Register />
                  </NotLoggedIn>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserSession>
      </Provider>
    </>
  );
}

export default App;
