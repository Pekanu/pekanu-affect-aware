import React, { useEffect, useState } from "react";
import CourseForm from "../components/courses/form/CourseForm";
import { Divider } from "@mui/material";
import { useHttpRequest } from "../../hooks/httpClient";
import { useNavigate } from "react-router-dom";

export default function AddCourseFormPage() {
  return (
    <div>
      <div className="p-5"></div>
      <Divider variant="middle"></Divider>

      <CourseForm />
    </div>
  );
}
