import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authcontext";

export const useHeader = () => {
    const { authUser, logout } = useAuth();
    const [activeItem, setActiveItem] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);


    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = authUser || storedUser;

    const navigate = useNavigate();

    const handleClose = () => setAnchorEl(null);

    const handleItemClick = (path) => {
        setActiveItem(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate("/");
    };

    const headerRef = useRef(null);

    const headerFunc = () => {
        if (window.scrollY > 80) {
            headerRef.current?.classList.add("sticky__header");
        } else {
            headerRef.current?.classList.remove("sticky__header");
        }
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };


    useEffect(() => {
        window.addEventListener("scroll", headerFunc);
        return () => window.removeEventListener("scroll", headerFunc);
    }, []);

    return {
        activeItem,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        user,
        handleItemClick,
        handleLogout,
        headerRef,
        toggleDrawer,
        setDrawerOpen,
        drawerOpen
    };
};
