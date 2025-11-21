import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../../context/authcontext";
import { loginUserApi } from "../../../../api/auth.api";
export const useLogin = () => {
    const [loginuser, setLoginUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginuser, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { token, user } = await loginUserApi(loginuser);

            localStorage.setItem("token", token);
            sessionStorage.setItem("user", JSON.stringify(user));

            login(user);

            Swal.fire("Success!", "Login successful", "success");
            navigate("/home");
        } catch (error) {
            Swal.fire(
                "Error!",
                error?.response?.data?.message || "Login failed",
                "error"
            );
        }
    }
    return {
        loginuser,
        handleChange,
        handleLogin,
    }
}