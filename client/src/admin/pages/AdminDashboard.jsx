import React, { useEffect, useState } from "react";
import AddCourseCard from "../components/dashboard/AddCourseCard";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import SimpleContainer from "../components/dashboard/AdminCourseContainer";
import PekanuTheme from "../../store/Theme";
import { useHttpRequest } from "../../hooks/httpClient";
import DeleteModal from "../components/dashboard/DeleteModal";
import Loader from "../../components/utils/Loader";

export default function AdminDashboard() {
  const [courseData, setCourseData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rerender, setRerender] = useState(false);

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const sendRequest = useHttpRequest();

  useEffect(() => {
    const GetCourse = async () => {
      try {
        const courseData = await sendRequest(`/api/course`, {
          method: "GET",
        });

        setCourseData(courseData.data);
        setLoading(false);
      } catch (error) {}
    };

    GetCourse();
  }, [rerender]);

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }
  return (
    <>
      {!loading && (
        <>
          <PekanuTheme>
            <AddCourseCard />
            <Divider variant="middle" />

            <Typography className="p-10 text-center" variant="h2">
              Courses
            </Typography>
            <Divider variant="middle" />

            <Stack spacing={10}>
              <SimpleContainer
                courseData={courseData}
                openModal={handleDeleteModalOpen}
                setCourse={setCourse}
              />
            </Stack>
            <DeleteModal
              open={deleteModalOpen}
              handleClose={handleDeleteModalClose}
              course={course}
              triggerRerender={triggerRerender}
            />
          </PekanuTheme>
        </>
      )}
    </>
  );
}
