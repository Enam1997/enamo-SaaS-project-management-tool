import { CircularProgress, Stack } from "@mui/material";
import React from "react";

const AppLoader = () => {
  return (
    <Stack mt={10} alignItems="center">
      <CircularProgress />
    </Stack>
  );
};

export default AppLoader;
