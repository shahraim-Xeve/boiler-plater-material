import React, { useRef, useState, useEffect } from "react";
import { signUpUser, getAllData, storage } from "../Config/Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourseTeachers, setSelectedCourseTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedTeacherDays, setSelectedTeacherDays] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const emailRef = useRef();
  const daysRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const fatherNameRef = useRef();
  const dobRef = useRef();
  const coursesRef = useRef();
  const teacherRef = useRef();
  const genderRef = useRef();
  const fileInputRef = useRef();
  const phoneNumberRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesData = await getAllData("courses");
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const course = courses.find((course) => course.course === selectedCourse);
    setCourseId(course.documentId);
    setSelectedCourseTeachers(course.teachers || []);
    setSelectedTeacher("");
    setSelectedTeacherDays([]);
  };

  const handleTeacherChange = (e) => {
    const selectedTeacher = e.target.value;
    const teacher = selectedCourseTeachers.find(
      (teacher) => teacher.name === selectedTeacher
    );
    setSelectedTeacher(selectedTeacher);
    setSelectedTeacherDays(teacher.days || []);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userEmail = emailRef.current.value;
    const userPass = passwordRef.current.value;
    let type = "student";

    const studentData = {
      name: nameRef.current.value,
      gender: genderRef.current.value,
      fatherName: fatherNameRef.current.value,
      phone: phoneNumberRef.current.value,
      courseID: courseId,
      courseTeacher: teacherRef.current.value,
      CourseDay: daysRef.current.value,
      DOB: dobRef.current.value,
    };

    if (selectedFile) {
      const storageRef = ref(storage, userEmail);
      await uploadBytes(storageRef, selectedFile).then(() => {
        getDownloadURL(storageRef).then((url) => {
          console.log(url);
          studentData.fileURL = url;
        });
      });
    } else {
      studentData.fileURL =
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.svg";
    }

    signUpUser({ userEmail, userPass, type, studentData })
      .then((res) => {
        console.log(res);
        if (res.type === "student") {
          navigate("/student");
        } else if (res.type === "admin") {
          navigate("/admin");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={8} lg={6}>
        <form onSubmit={handleSignUp}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <Box sx={{ width: "100%", display: "flex", gap: 5 }}>
            <TextField
              label="Name"
              variant="outlined"
              inputRef={nameRef}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Father's Name"
              variant="outlined"
              inputRef={fatherNameRef}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            inputRef={emailRef}
            fullWidth
            required
            margin="normal"
          />
          <Box sx={{ width: "100%", display: "flex", gap: 5 }}>
            <TextField
              type="date"
              variant="outlined"
              inputRef={dobRef}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Phone Number"
              type="tel"
              variant="outlined"
              inputRef={phoneNumberRef}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            fullWidth
            required
            margin="normal"
          />

          <Box sx={{ width: "100%", display: "flex", gap: 5 }}>
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel id="courses-label">Courses</InputLabel>
              <Select
                labelId="courses-label"
                id="courses"
                label="Courses"
                inputRef={coursesRef}
                onChange={handleCourseChange}
              >
                {courses.map((course, index) => (
                  <MenuItem key={index} value={course.course}>
                    {course.course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel id="teachers-label">Teachers</InputLabel>
              <Select
                labelId="teachers-label"
                id="teachers"
                label="Teachers"
                inputRef={teacherRef}
                value={selectedTeacher}
                onChange={handleTeacherChange}
              >
                {selectedCourseTeachers.map((teacher, index) => (
                  <MenuItem key={index} value={teacher.name}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ width: "100%", display: "flex", gap: 5 }}>
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel id="days-label">Days</InputLabel>
              <Select
                labelId="days-label"
                id="days"
                label="Days"
                inputRef={daysRef}
              >
                {selectedTeacherDays.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth required margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                label="Gender"
                inputRef={genderRef}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Sign Up
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
