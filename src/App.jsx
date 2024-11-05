import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./modules/authentication/components/Login/Login";
import NotFound from "./modules/shared/components/NotFound/NotFound";
import Register from "./modules/authentication/components/Registeration/Register";
import ForgetPass from "./modules/authentication/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/authentication/components/ResetPass/ResetPass";
import Dashboard from "./modules/dashboard/components/Dashboard";
import RecipesList from "./modules/recipes/components/RecipesList/RecipesList";
import CategoriesList from "./modules/categories/components/CategoriesList/CategoriesList";
import UsersList from "./modules/users/components/UsersList/UsersList";
import FavoritesList from "./modules/favorites/components/Favorites/FavoritesList";
import CategoryData from "./modules/categories/components/CategoryData/CategoryData";
import AuthLayout from "./modules/layout/components/AuthLayout";
import MainLayout from "./modules/layout/components/MainLayout";
import RecipesData from "./modules/recipes/components/RecipeData/RecipeData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forget-password",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
      ],
    },
    {
      path: "dashboard",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipe-data",
          element: <RecipesData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "category-data",
          element: <CategoryData />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "favorites",
          element: <FavoritesList />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
