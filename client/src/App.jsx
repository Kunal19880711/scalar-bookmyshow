import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Paths, { SubPaths } from "./constants/Paths";
import ProtectedRoute from "./components/ProtectedRoute";
import NotLoggedIn from "./components/NotLoggedIn";

const UserSession = lazy(() => import("./components/UserSession"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const Profile = lazy(() => import("./pages/Profile"));
const Partner = lazy(() => import("./pages/Partner"));
const SingleMovie = lazy(() => import("./pages/SingleMovie"));
const BookShow = lazy(() => import("./pages/BookShow"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const { loading } = useSelector((store) => store.loader);
  const singleMoviePath = Paths.SingleMovie.replace(
    SubPaths.IdParamFormat,
    SubPaths.IdParam
  );
  const bookShowPath = Paths.BookShow.replace(
    SubPaths.IdParamFormat,
    SubPaths.IdParam
  );
  const loader = (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
  return (
    <>
      <Suspense fallback={loader}>
        <UserSession>
          <BrowserRouter>
            {loading && loader}

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
      </Suspense>
    </>
  );
}

export default App;
