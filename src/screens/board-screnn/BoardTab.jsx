import React, { memo } from "react";
import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import Task from "./Task";
// import { Droppable } from "react-beautiful-dnd";
// Use this below cusom Droppable for Strict mode beacuse avobe Droppable works but in not workess on Strict mode
import Droppable from "../../components/utils/StrictModeDroppable";
const BoardTab = ({ name, openAddTaskModal, tasks, status, removeTask }) => {
  console.log("Tab:", name);
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Grid {...provided.droppableProps} ref={provided.innerRef} item xs={4}>
          <Stack p={3} bgcolor={"#000"}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h6" fontWeight={400}>
                {name}
              </Typography>
              <IconButton onClick={() => openAddTaskModal(status)}>
                <AddCircleOutline fontSize="small" />
              </IconButton>
            </Stack>
            <Stack mt={3} spacing={2}>
              {tasks?.map((task, index) => (
                <Task
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  removeTask={() => removeTask(status, task.id)}
                  index={index}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </Droppable>
  );
};

export default memo(BoardTab);
