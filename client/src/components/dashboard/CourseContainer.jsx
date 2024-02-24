import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CourseBox from "./CourseBox";

function FormRow1({ title, description, thumbnail, courseID }) {
  return (
    <Grid item xs={3}>
      <CourseBox
        image={import.meta.env.VITE_SERVER_ENDPOINT + `/${thumbnail}`}
        courseName={title}
        description={description}
        courseID={courseID}
      />
    </Grid>
  );
}
export default function SimpleContainer({ courseData, regData }) {
  return (
    <Box sx={{ flexGrow: 1, padding: "50px" }}>
      <Grid container spacing={10}>
        <Grid container item spacing={8}>
          {courseData
            ? courseData.map((course) => (
                <FormRow1
                  key={course._id}
                  courseID={course._id}
                  title={course.title}
                  description={course.description}
                  thumbnail={course.thumbnail}
                />
              ))
            : regData.map((course) => (
                <FormRow1
                  key={course?.course?._id}
                  courseID={course?.course?._id}
                  title={course?.course?.title}
                  description={course?.course?.description}
                  thumbnail={course?.course?.thumbnail}
                />
              ))}
        </Grid>
      </Grid>
    </Box>
  );
}
