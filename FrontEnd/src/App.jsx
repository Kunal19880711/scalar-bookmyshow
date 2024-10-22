import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Paths, { SubPaths } from "./constants/Paths";
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
import SingleMovie from "./pages/SingleMovie";
import BookShow from "./pages/BookShow";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const singleMoviePath = Paths.SingleMovie.replace(
    SubPaths.IdParamFormat,
    SubPaths.IdParam
  );
  const bookShowPath = Paths.BookShow.replace(
    SubPaths.IdParamFormat,
    SubPaths.IdParam
  );
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
                path={Paths.Profile}
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
                path={singleMoviePath}
                element={
                  <ProtectedRoute>
                    <SingleMovie />
                  </ProtectedRoute>
                }
              />
              <Route
                path={bookShowPath}
                element={
                  <ProtectedRoute>
                    <BookShow />
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
              <Route
                path={Paths.ForgotPassword}
                element={
                  <NotLoggedIn>
                    <ForgotPassword />
                  </NotLoggedIn>
                }
              />
              <Route
                path={Paths.ResetPassword}
                element={
                  <NotLoggedIn>
                    <ResetPassword />
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
