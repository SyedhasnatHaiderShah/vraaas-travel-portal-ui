import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Spinner Component
const Spinner = () => {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(0, 0, 0, 0.1)",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add spinner animation to global CSS
const spinnerAnimationStyle = document.createElement("style");
spinnerAnimationStyle.type = "text/css";
spinnerAnimationStyle.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(spinnerAnimationStyle);

// AuthWrapper Component
const AuthWrapper = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      setIsValid(response.ok && result.is_success);
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (isValid === null) return <Spinner />;
  if (!isValid) return <Navigate to="/sign-in" replace />;
  return children;
};

export default AuthWrapper;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthWrapper = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const validateToken = async () => {
//     if (!token) {
//       navigate("/sign-in");
//       return;
//     }
//     try {
//       const responce = await axios.get(
//         "http://localhost:3000/auth/verify-token",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (responce.data.is_success) {
//         navigate("/");
//       }
//     } catch (error) {
//       localStorage.removeItem("token");
//       navigate("/sign-in");
//     }
//   };

//   useEffect(() => {
//     validateToken();
//   }, [navigate]);

//   return children;
// };

// export default AuthWrapper;
