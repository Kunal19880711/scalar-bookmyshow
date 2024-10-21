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
  User: "/user",
  SingleMovie: `/movie/${SubPaths.IdParamFormat}`,
  BookShow: `/book-show/${SubPaths.IdParamFormat}`,
};

export default Paths;
