import { Close } from "@mui/icons-material";
import { Dialog, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ModalHeader from "../../components/layout/ModalHeader";

const CreateBoardModal = () => {
  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title={"Create Board"} />
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
