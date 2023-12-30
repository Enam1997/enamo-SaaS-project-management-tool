import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import ImageEl from "../../components/utils/ImageEl";
import LogoImg from "../../assets/logo.svg";
import { ExitToApp } from "@mui/icons-material";

const TopBar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ImageEl height={"25px"} src={LogoImg} alt="Enamo" />
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Create Board</Button>
          <Button startIcon={<ExitToApp />} color="inherit">
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
