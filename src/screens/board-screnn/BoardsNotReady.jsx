import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const BoardsNotReady = () => {
  const navigate = useNavigate();
  return (
    <Stack textAlign="center" alignItems="center" mt={10}>
      <Typography variant="h5">Seems like your board is not ready</Typography>
      <Typography mt={1} mb={2}>
        Sometime it may take a few seconds for the board to be ready for use.
        <br /> Try again in a few seconds
      </Typography>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/boards")}
        variant="contained"
      >
        Go back
      </Button>
    </Stack>
  );
};

export default BoardsNotReady;
