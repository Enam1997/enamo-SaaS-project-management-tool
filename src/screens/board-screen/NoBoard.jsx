import { Stack, Typography } from "@mui/material";
import React from "react";

const NoBoard = () => {
  return (
    <Stack mt={15} spacing={1} textAlign="center">
      <Typography variant="h5">Nor Boards created</Typography>
      <Typography>Create your first board today</Typography>
    </Stack>
  );
};

export default NoBoard;
