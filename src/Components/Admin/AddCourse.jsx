import * as React from "react";
import { useTheme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { checkCombinationExists } from "../../Config/Firebase/Firebase";

const teachers = [
  { name: "Oliver Hansen", days: ["MWF", "TTS"] },
  { name: "Van Henry", days: ["MWF", "TTS"] },
  { name: "April Tucker", days: ["MWF", "TTS"] },
  { name: "Ralph Hubbard", days: ["MWF", "TTS"] },
  { name: "Omar Alexander", days: ["MWF", "TTS"] },
  { name: "Carlos Abbott", days: ["MWF", "TTS"] },
];

const courses = ["Graphic Design", "Web Development", "Blockchain", "Flutter"];

const AddCourse = () => {
  const theme = useTheme();
  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [selectedDays, setSelectedDays] = React.useState([]);

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDays(event.target.value);
  };

  const handleSaveToFirestore = () => {
    if (
      selectedCourse === "" ||
      selectedDays.length === 0 ||
      selectedTeacher === ""
    ) {
      alert("Please fill in all fields");
    } else {
      const selectedTeacherObj = teachers.find(
        (teacher) => teacher.name === selectedTeacher
      );
      checkCombinationExists(
        selectedTeacherObj.name,
        selectedCourse,
        selectedDays,
        "courses"
      )
        .then((exists) => {
          if (exists) {
            alert("This combination of teacher and course already exists.");
          } else {
            alert("Course added successfully!");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Add Course</h1>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="teacher-label">Teacher Name</InputLabel>
        <Select
          labelId="teacher-label"
          id="teacher"
          value={selectedTeacher}
          onChange={handleTeacherChange}
          label="Teacher Name"
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.name} value={teacher.name}>
              {teacher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="course-label">Course Name</InputLabel>
        <Select
          labelId="course-label"
          id="course"
          value={selectedCourse}
          onChange={handleCourseChange}
          label="Course Name"
        >
          {courses.map((course) => (
            <MenuItem key={course} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="day-label">Days of the Week</InputLabel>
        <Select
          labelId="day-label"
          id="day"
          multiple
          value={selectedDays}
          onChange={handleDayChange}
          label="Days of the Week"
        >
          {selectedTeacher &&
            teachers
              .find((teacher) => teacher.name === selectedTeacher)
              .days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveToFirestore}
        sx={{ mt: 2 }}
      >
        Save to Firestore
      </Button>
    </Box>
  );
};

export default AddCourse;
