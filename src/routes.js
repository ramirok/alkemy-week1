import { Routes, Navigate, Route } from "react-router-dom";

import { loadToken } from "./libs/localStorage";
import NavBar from "./components/navBar/navBar";
import CreatePostPage from "./pages/createPostPage/createPostPage";
import DetailsPage from "./pages/detailsPage/detailsPage";
import EditPostPage from "./pages/editPostPage/editPostPage";
import HomePage from "./pages/homePage/homePage";
import LoginPage from "./pages/loginPage/loginPage";
import Page404 from "./pages/page404/page404";

const ROUTES = [
  {
    path: "/*",
    key: "ROOT",
    Component: () => {
      return loadToken() ? (
        <Navigate to={"/app"} />
      ) : (
        <Navigate to={"/auth/login"} />
      );
    },
  },
  {
    path: "/app/*",
    key: "APP",
    Component: (props) => {
      return loadToken() ? (
        <>
          <NavBar />
          <RenderRoutes {...props} />
        </>
      ) : (
        <Navigate to={"/auth/login"} />
      );
    },
    routes: [
      {
        path: "/",
        key: "HOME",
        Component: HomePage,
      },
      {
        path: "post/new",
        key: "CREATE",
        Component: CreatePostPage,
      },
      {
        path: "post/:id",
        key: "DETAILS",
        Component: DetailsPage,
      },
      {
        path: "post/:id/edit",
        key: "EDIT",
        Component: EditPostPage,
      },
    ],
  },
  {
    path: "auth/login",
    key: "AUTH_LOGIN",
    Component: loadToken() ? () => <Navigate to={"/app"} /> : LoginPage,
  },
];

export default ROUTES;

const RouteWithSubRoutes = (props) => {
  const { route } = props;
  return (
    <Route
      key={route.key}
      path={route.path}
      element={<route.Component routes={route.routes} />}
    />
  );
};

export const RenderRoutes = (props) => {
  return (
    <Routes>
      {props.routes.map((route) => {
        return RouteWithSubRoutes({ route });
      })}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
