import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

import SimpleContainer from '../components/dashboard/CourseContainer';
import { useEffect, useState, useCallback } from 'react';
import { useHttpRequest } from '../hooks/httpClient';
import Loader from '../components/utils/Loader';

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sendRequest = useHttpRequest();

  const GetCourse = useCallback(async () => {
    try {
      const courseData = await sendRequest(`/api/course`, {
        method: 'GET',
      });

      setCourseData(courseData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    GetCourse();
  }, [GetCourse]);

  if (loading) {
    return (
      <div>
        <Loader height='600px' />
      </div>
    );
  }

  return (
    <>
      {!loading && (
        <>
          {' '}
          <Typography
            className='p-10 text-center'
            variant='h2'
            style={{
              fontFamily:
                'Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
            }}
          >
            All Courses
          </Typography>
          <Divider variant='middle' />
          <Stack spacing={10}>
            <SimpleContainer courseData={courseData} />
          </Stack>
        </>
      )}
    </>
  );
}

export default AllCourses;
