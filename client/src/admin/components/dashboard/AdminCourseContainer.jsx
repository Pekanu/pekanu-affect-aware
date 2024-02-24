import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseBox from "./AdminCourseBox";

function FormRow1({
  title,
  description,
  thumbnail,
  openModal,
  courseID,
  setCourse,
}) {
  return (
    <Grid item xs={3}>
      <CourseBox
        image={import.meta.env.VITE_SERVER_ENDPOINT + `/${thumbnail}`}
        courseName={title}
        description={description}
        openModal={openModal}
        courseID={courseID}
        setCourse={setCourse}
      />
    </Grid>
  );
}

export default function SimpleContainer({ courseData, openModal, setCourse }) {
  return (
    <Box sx={{ flexGrow: 1, padding: "50px" }}>
      <Grid container spacing={10}>
        <Grid container item spacing={8}>
          {courseData &&
            courseData.map((course) => (
              <FormRow1
                key={course._id}
                courseID={course._id}
                title={course.title}
                description={course.description}
                thumbnail={course.thumbnail}
                openModal={openModal}
                setCourse={setCourse}
              />
            ))}
        </Grid>
      </Grid>
    </Box>
  );
}
