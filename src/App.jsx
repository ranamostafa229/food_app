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
import RecipesData from "./modules/recipes/components/RecipeData/RecipeData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./modules/shared/components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "./modules/shared/components/Layout/AuthLayout";
import MainLayout from "./modules/shared/components/Layout/MainLayout";
import RecipeForm from "./modules/recipes/components/RecipeForm/RecipeForm";
import VerificationAccount from "./modules/authentication/components/VerificationAccount/VerificationAccount";
import AdminProtectedRoute from "./modules/shared/components/AdminProtectedRoute/AdminProtectedRoute";

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
          path: "verfiy-account",
          element: <VerificationAccount />,
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
      path: "",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipes/new-recipe",
          element: (
            <AdminProtectedRoute>
              <RecipeForm />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "recipes/:recipeId",
          element: (
            <AdminProtectedRoute>
              <RecipeForm />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "recipe-data",
          element: <RecipesData />,
        },
        {
          path: "categories",
          element: (
            <AdminProtectedRoute>
              <CategoriesList />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "category-data",
          element: (
            <AdminProtectedRoute>
              <CategoryData />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <AdminProtectedRoute>
              <UsersList />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "favorites",
          element: <FavoritesList />,
        },
      ],
    },
    {
      path: "/not-found",
      element: <NotFound />,
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
