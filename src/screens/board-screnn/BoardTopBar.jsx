import React, { memo } from "react";
import { ArrowBack, Delete } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";

const BoardTopBar = ({ name, lastUpdated, color, deleteBoard }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const navigate = useNavigate();

  return (
    <AppBar
      position='sticky'
      sx={{ borderBottom: "5px solid", borderColor: colors[color] }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack spacing={1} alignItems={"center"} direction={"row"}>
          <IconButton onClick={() => navigate("/boards")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">{name}</Typography>
        </Stack>
        <Stack spacing={2} alignItems={"center"} direction={"row"}>
          <Typography display={{ xs: "none", sm: "block" }} variant="body2">
            Last Updated: {lastUpdated}
          </Typography>
          <IconButton onClick={deleteBoard}>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(BoardTopBar);
