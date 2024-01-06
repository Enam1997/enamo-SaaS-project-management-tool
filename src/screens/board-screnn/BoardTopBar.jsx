import React from "react";
import { ArrowBack, Delete } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";

const BoardTopBar = ({ name, lastUpdated, color }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
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
          <Typography variant="body2">Last Updated: {lastUpdated}</Typography>
          <IconButton>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
