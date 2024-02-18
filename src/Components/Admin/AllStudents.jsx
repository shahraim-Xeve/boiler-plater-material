import React, { useEffect, useState } from "react";
import { getAllData } from "../../Config/Firebase/Firebase";
import { Avatar, Card, CardContent, Container, Typography } from "@mui/material";

const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const userData = await getAllData("users");
      // Filter the users with type "student"
      const studentData = userData.filter((user) => user.type === "student");
      setAllStudents(studentData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        All Students
      </Typography>
      {allStudents.map((student, index) => (
        <Card key={index} style={{ marginBottom: "1rem" }}>
          <CardContent style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={student.studentData.fileURL}
              alt={student.studentData.name}
              style={{ marginRight: "1rem" }}
            />
            <Typography variant="h6">{student.studentData.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AllStudents;
