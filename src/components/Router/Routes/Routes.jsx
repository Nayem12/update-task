import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main/Main";
import Addtask from "../../AddTask/Addtask";
import Error from "../../Error/Error";
import Home from "../../Home/Home";
// import MyTask from "../../MyTask/MyTask";
// import ComplpletedTask from "../../CompletedTask/CompletedTask";
import Login from "../../Login/Login";
import SignUp from "../../SignUp/SignUp";
import MyTask from "../../MyTask/MyTask";
import CompletedTask from "../../CompletedTask/CompletedTask";
import MyMedia from "../../MyMedia/MyMedia";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/add-a-task",
                element: <Addtask></Addtask>
            },
            {
                path: "/my-tasks",
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: "/completed-task",
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            {
                path: "/media",
                element: <MyMedia></MyMedia>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },

        ]
    }
]);

export default router;