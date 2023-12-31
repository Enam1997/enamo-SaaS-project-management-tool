import { Snackbar } from "@mui/material";
import React from "react";
import useStore from "../../store";

const SnackBarManager = () => {
  const { toastrMsg, setToastr } = useStore();
  return (
    <Snackbar
      message={toastrMsg}
      open={!!toastrMsg}
      autoHideDuration={5000}
      onClose={() => setToastr("")}
    />
  );
};

export default SnackBarManager;
