import React from "react";
import AddCourse from "../Components/Admin/AddCourse";
import { Route, Routes } from "react-router-dom";
import { AllCourses } from "../Components/Admin/AllCourses";
import AllStudents from "../Components/Admin/AllStudents";
import { InfoAll } from "../Components/Admin/InfoAll";
import CourseDetails from "../Components/Admin/CourseDetails";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<InfoAll />} />
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/allcourse" element={<AllCourses />} />
        <Route path="/courseDetails/:courseId" element={<CourseDetails />} />
        <Route path="/allstudents" element={<AllStudents />} />
      </Routes>
    </div>
  );
};

export default Home;
