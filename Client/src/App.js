import "./App.css";
import { useEffect } from "react";
import Aos from "aos";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import AllRoutes from "./route/route";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import AdminRouter from "./admin/adminRouter";

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
