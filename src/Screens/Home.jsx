import React from "react";
import AddCourse from "../Components/Admin/AddCourse";
import { Route, Routes } from "react-router-dom";
import { AllCouses } from "../Components/Admin/AllCouses";
import AllStudents from "../Components/Admin/AllStudents";
import { InfoAll } from "../Components/Admin/InfoAll";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InfoAll />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/allcourse" element={<AllCouses />} />
        <Route path="/allcourse/*" element={<AllCouses />} />
        <Route path="/allstudents" element={<AllStudents />} />
      </Routes>
    </div>
  );
};

export default Home;
