import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main/Main";
import Addtask from "../../AddTask/Addtask";
import Error from "../../Error/Error";
import Home from "../../Home/Home";
// import MyTask from "../../MyTask/MyTask";
// import ComplpletedTask from "../../CompletedTask/CompletedTask";
import Login from "../../Login/Login";
import SignUp from "../../SignUp/SignUp";
import Loading from "../../Loading/Loading";
import MyTask from "../../MyTask/MyTask";
import CompletedTask from "../../CompletedTask/CompletedTask";
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
                element: <MyTask></MyTask>
            },
            {
                path: "/completed-task",
                element: <CompletedTask></CompletedTask>
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