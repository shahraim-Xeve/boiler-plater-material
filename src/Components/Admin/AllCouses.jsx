import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Typography, Grid } from "@mui/material";
import { getAllData } from "../../Config/Firebase/Firebase";

export const AllCouses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const coursesData = await getAllData("courses");
      setCourses(coursesData);
      console.log(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {courses.map((course, index) => (
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
            <Button variant="contained" color="primary">
              Check Details
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
