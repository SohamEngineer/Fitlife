import "./App.css";
import { useEffect } from "react";
import Aos from "aos";
import Footer from "./layout/footer";
import Header from "./layout/header";
import AllRoutes from "./route/route";
// import { AuthProvider, useAuth } from "./utils/AuthContext";
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
          <Header />
          <AllRoutes />
          <Footer />
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
    // <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    // </Router>
  );

}

export default App;
