// src/components/TrackLogin.jsx
import  { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TrackLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timerInterval;

    Swal.fire({
      title: "Please log in to track your fitness!",
      html: "Redirecting in <b></b> ms...",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          if (b) b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(() => {
      navigate("/login");
    });
  }, [navigate]);

  return null; // This page shows only the modal
};

export default TrackLogin;
