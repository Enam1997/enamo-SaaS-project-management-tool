import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";
import useApp from "../../hooks/useApp";
import useStore from "../../store";

const CreateBoardModal = ({ closeModal }) => {
  const { createBoard } = useApp();
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setToastr } = useStore();

  const handleCreate = async () => {
    const tempName = name.trim();

    if (!tempName) return setToastr("Board name cant not Empty");
    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(tempName))
      return setToastr("Board name can't be special charectar or more than 20 char");

    try {
      setLoading(true);
      await createBoard({ name: tempName, color });
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open onClose={closeModal} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title={"Create Board"} onClose={closeModal} />
        <Stack my={5} spacing={3}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Board Name"
          />
          <Stack spacing={1.5} direction="row">
            <Typography>Color: </Typography>

            {colors.map((clr, index) => (
              <Box
                onClick={() => setColor(index)}
                key={clr}
                height={25}
                width={25}
                backgroundColor={clr}
                borderRadius="50%"
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          disabled={loading}
          onClick={handleCreate}
          variant="contained"
          size="large"
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
