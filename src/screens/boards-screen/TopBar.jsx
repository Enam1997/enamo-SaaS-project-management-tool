import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import ImageEl from "../../components/utils/ImageEl";
import LogoImg from "../../assets/logo.svg";
import { AddCircle, ExitToApp } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const TopBar = ({ openmodal }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ImageEl height={"25px"} src={LogoImg} alt="Enamo" />
        <Stack direction="row" spacing={2}>
          {isXs ? (
            <>
              <IconButton onClick={openmodal}>
                <AddCircle color="primary" />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <>
              <Button onClick={openmodal} variant="contained">
                Create Board
              </Button>
              <Button
                onClick={() => signOut(auth)}
                startIcon={<ExitToApp />}
                color="inherit"
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
