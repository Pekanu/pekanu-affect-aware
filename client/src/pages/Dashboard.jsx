import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Divider, Stack } from '@mui/material'
import BotInteractionChart from '../components/dashboard/BotInteractionChart'
import HoursSpent from '../components/dashboard/HoursSpent'
import LectureQuizStatistics from '../components/dashboard/LectureQuizStatistics'
import RecentActivity from '../components/dashboard/RecentActivity'
import Profile from '../components/dashboard/Profile'
// import Divider from "@mui/material/Divider";

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }} className='pt-3'>
      <Stack direction='row'>
        <Stack
          direction='column'
          spacing={1}
          sx={{
            display: 'flex',
            width: '80%',
            height: '690px',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            <Typography className='pb-1' variant='h4'>
              <span
                style={{
                  fontWeight: 'bold',
                }}
              >
                Welcome, Pratik
              </span>
            </Typography>
            <Typography variant='subtitle1'>
              Today is the best time to upgrade your future skills !!
            </Typography>
          </div>

          <Box
            sx={{
              display: 'flex',
            }}
            className='bg-white shadow-lg  p-3'
          >
            <LectureQuizStatistics />
          </Box>

          <Stack
            direction='row'
            spacing={1}
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
              }}
              className='bg-white shadow-lg  p-6'
            >
              <HoursSpent />
            </Box>
            <Box
              sx={{
                display: 'flex',
              }}
              className='bg-white shadow-lg  p-6'
            >
              <BotInteractionChart />
            </Box>
          </Stack>
        </Stack>

        <Stack
          direction='column'
          spacing={1}
          sx={{
            display: 'flex',
            width: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Profile />
          </Box>
          <Divider orientation='horizontal' flexItem />

          <Box
            sx={{
              display: 'flex',
              padding: '10px',
            }}
            className='bg-white shadow-lg  p-1'
          >
            <RecentActivity />
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Dashboard
