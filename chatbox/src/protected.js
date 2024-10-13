import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("id"); // Use this if you didn't use context
  // const { user } = useAuth(); // Use this if you're using context

  if (!userId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
