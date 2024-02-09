import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

const ProtectedRoute = ({ component }) => {
  const navigate = useNavigate();

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      setIsUser(true);
    });
  }, []);

  return isUser ? (
    component
  ) : (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "200px",
      }}
    >
      <CircularProgress size="lg" />
    </Box>
  );
};

export default ProtectedRoute;
