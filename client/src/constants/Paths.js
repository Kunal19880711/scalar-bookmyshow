export const SubPaths = {};
SubPaths.IdParamFormat = "{id}";
SubPaths.IdParam = ":id";

const Paths = {
  Login: "/login",
  Register: "/register",
  Home: "/",
  Admin: "/admin",
  Profile: "/profile",
  Partner: "/partner",
  SingleMovie: `/movie/${SubPaths.IdParamFormat}`,
  BookShow: `/book-show/${SubPaths.IdParamFormat}`,
  ForgotPassword: "/forgot-password",
  ResetPassword: "/reset-password",
};

export default Paths;
