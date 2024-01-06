import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ id, text, removeTask, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          direction={"row"}
          alignItems={"center"}
          spacing={1}
        >
          <Typography
            width={"100%"}
            p={1}
            border={"1px solid"}
            borderColor={"#777980"}
            bgcolor={"#45474E"}
          >
            {text}
          </Typography>
          <IconButton onClick={removeTask}>
            <Delete />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;
