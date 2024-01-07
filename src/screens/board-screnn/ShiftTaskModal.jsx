import { Button, Chip, Dialog, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../../components/layout/ModalHeader";
import { statusMap } from "./BoardInterface";

const ShiftTaskModal = ({ onClose, task, shiftTask }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift Task" onClose={onClose} />
        <Stack mt={3} my={3} spacing={3}>
          <Stack spacing={1}>
            <Typography>Task:</Typography>
            <Typography p={1.5} bgcolor="#45474E">
              {task.text}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            <Typography>Status:</Typography>
            <Stack direction="row" spacing={1}>
              {Object.entries(statusMap).map(([status, label]) => (
                <Chip
                  variant={taskStatus === status ? "filled" : "outlined"}
                  key={status}
                  label={label}
                  onClick={() => setTaskStatus(status)}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Button onClick={() => shiftTask(taskStatus)} variant="contained">
          Shift Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;
