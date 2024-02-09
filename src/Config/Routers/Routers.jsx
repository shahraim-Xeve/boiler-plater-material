import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../Components/Layouts/Navbar";
import Footer from "../../Components/Layouts/Footer";
import Login from "../../Screens/Login";
import Register from "../../Screens/Register";
import Home from "../../Screens/Home";
import ProtectedRoute from "./ProtectedRoute";
import Student from "../../Screens/student";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import Error from "../../Components/Layouts/Error";

const Routers = () => {
  const [userIN, setUserIN] = useState();
  const [checkType, setCheckType] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserIN(user);
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCheckType(doc.data().type);
        });
      } else {
        console.log("User not authenticated");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <Navbar userIN={userIN} setUserIN={setUserIN} checkType={checkType} />
      <Routes>
        {checkType === "admin" ? (
          <Route
            path="/admin"
            element={<ProtectedRoute component={<Home />} />}
          />
        ) : checkType === "student" ? (
          <Route
            path="/student"
            element={<ProtectedRoute component={<Student />} />}
          />
        ) : (
          "loading"
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ProtectedRoute component={<Error />} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
