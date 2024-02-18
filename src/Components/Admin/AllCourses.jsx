import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Typography, Grid, CircularProgress } from "@mui/material";
import { getAllData } from "../../Config/Firebase/Firebase";
import { useNavigate } from "react-router-dom";

export const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const coursesData = await getAllData("courses");
      setCourses(coursesData);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleCourseDetail = (courseId) => {
    navigate(`/admin/courseDetails/${courseId}`);
  };

  return (
    <Grid container spacing={2}>
      {loading ? ( // Show loading indicator if data is being fetched
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress />
        </Grid>
      ) : (
        courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {course.course}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Teacher:
                  {course.teachers &&
                    course.teachers.map((teacher, index) => (
                      <span key={index}> {teacher.name}</span>
                    ))}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCourseDetail(course.documentId)}
              >
                Check Details
              </Button>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default AllCourses;
