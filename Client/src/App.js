import "./App.css";
import { useEffect } from "react";
import Aos from "aos";
import AllRoutes from "./route/route";
import { AuthProvider, useAuth } from "./context/authcontext";
import AdminRouter from "./admin/pages/adminrouter";
function AppWrapper() {
  const { authUser } = useAuth();
  // ✅ Safe localStorage parse
  const storedUser = localStorage.getItem("user");
  let user = authUser;
  if (!user && storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
    }
  }
  const isAdmin = user && user.role === "admin";
  return (
    <>
      {isAdmin ? (
        <AdminRouter />
      ) : (
        <>
          <AllRoutes />
        </>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
  );

}

export default App;
