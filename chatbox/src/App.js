import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Contact from "./addContact";
import Right from "./Right";
import Login from "./login";
import SignUp from "./signUp";
import ProtectedRoute from "./protected";
import Profile from "./profile";
import UserProfile from "./userprofile";

function App() {
    const route = createBrowserRouter([
        {
            path: "/", element: <Login />
        },
        {
            path: "/signup", element: <SignUp />
        },
        {
            path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute>,
            children: [
                { path: "/home/Right/:id", element: <Right /> },
                { path: "/home/contact", element: <Contact /> },
                { path: "/home/profile", element: <Profile /> },
                { path: "/home/userprofile/:id", element: <UserProfile />}
            ]
        }
    ]);
    
    return (
        <RouterProvider router={route} />
    );
}

export default App;
