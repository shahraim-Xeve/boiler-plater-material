import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllData } from "../../Config/Firebase/Firebase";
import {
  CircularProgress,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [associatedUsers, setAssociatedUsers] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const courseData = await getAllData("courses");
      const selectedCourse = courseData.find(
        (course) => course.documentId === courseId
      );
      setCourseDetails(selectedCourse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setLoading(false);
    }
  };

  const handleTeacherClick = async (teacherName, index) => {
    console.log(`Clicked on teacher: ${teacherName}`);
    try {
      const userData = await getAllData("users");
      console.log("User data:", userData);
      const associatedUsersWithTeacher = userData.filter(
        (user) =>
          user.type === "student" &&
          user.studentData.courseTeacher === teacherName &&
          user.studentData.courseID === courseId
      );

      console.log("Associated users:", associatedUsersWithTeacher);
      setAssociatedUsers(associatedUsersWithTeacher);
      setClickedIndex(index);
    } catch (error) {
      console.error("Error fetching associated users:", error);
    }
  };

  return (
    <>
      <Link to="/admin/allcourse">Back</Link>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : courseDetails ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {courseDetails.course}
            </Typography>
            {courseDetails.teachers &&
              courseDetails.teachers.map((teacher, index) => (
                <Card
                  key={index}
                  sx={{ maxWidth: 400, marginBottom: 2, cursor: "pointer" }}
                  onClick={() => handleTeacherClick(teacher.name, index)}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {teacher.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Days: {teacher.days.join(", ")}
                    </Typography>
                    {clickedIndex === index && (
                      <List>
                        {associatedUsers.length > 0 ? (
                          associatedUsers.map((user, idx) => (
                            <ListItem key={idx}>
                              <ListItemIcon>
                                <AccountCircleIcon />
                              </ListItemIcon>
                              <ListItemText primary={user.studentData.name} />
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <ListItemText primary="No student enrolled." />
                          </ListItem>
                        )}
                      </List>
                    )}
                  </CardContent>
                </Card>
              ))}
          </>
        ) : (
          <Typography variant="body1">No course details found.</Typography>
        )}
      </Container>
    </>
  );
};

export default CourseDetails;
