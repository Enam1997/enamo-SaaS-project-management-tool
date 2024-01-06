import { Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";

const BoardItemCard = ({ name, color, createdAt, id }) => {

  const navigate = useNavigate()
  return (
    <Grid item xs={3}>
      <Stack
        p={2}
        bgcolor={"background.paper"}
        borderLeft="5px solid"
        borderColor={colors[color]}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box width="50%">
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              fontWeight={400}
              variant="h6"
            >
              {name}
            </Typography>
          </Box>
          <IconButton onClick={()=>navigate(`/boards/${id}`)} size="small">
            <Launch />
          </IconButton>
        </Stack>
        <Typography variant="caption"> Created at: {createdAt} </Typography>
      </Stack>
    </Grid>
  );
};

export default BoardItemCard;
