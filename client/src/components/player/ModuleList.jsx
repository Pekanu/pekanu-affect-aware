import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import useEventLogger, {ACTIONS} from "../../hooks/eventLogger";

function ModuleList({
  setCurrentIndex,
  currentIndex,
  courseData,
  AddRecentModule,
  setType,
}) {
  const logEvent = useEventLogger();
  return (
    <div style={{ height: "647px", width: "350px", overflowY: "scroll" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            style={{ padding: "29px" }}
            component="div"
            id="nested-list-subheader"
          >
            <Typography
              style={{
                fontWeight: "bold",
                color: "black",
                userSelect: "none",
              }}
              variant="h5"
            >
              Modules
            </Typography>
          </ListSubheader>
        }
      >
        {courseData.course.modules.map((module, index) => (
          <div key={index}>
            <Divider orientation="horizontal" flexItem />
            <ListItemButton
              onClick={() => {
                logEvent({
                  action: ACTIONS.CLICK,
                  context: {
                    moduleID: module._id,
                    moduleName: module.title,
                    moduleType: module.type,
                  },
                });
                setCurrentIndex(index);
                AddRecentModule();
              }}
              style={{
                backgroundColor:
                  currentIndex === index ? "#cfe8fc" : "transparent",
              }}
            >
              <ListItemIcon>
                {module?.type === "quiz" ? (
                  <AssignmentIcon />
                ) : module?.type === "notes" ? (
                  <MenuBookIcon />
                ) : module?.type === "video" ? (
                  <PlayCircleOutlineIcon />
                ) : (
                  <div></div>
                )}
              </ListItemIcon>
              <ListItemText primary={<span>{module?.title}</span>} />
            </ListItemButton>
          </div>
        ))}
      </List>
    </div>
  );
}

export default ModuleList;
