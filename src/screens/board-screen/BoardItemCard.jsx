import { Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../theme";

const BoardItemCard = ({ name, color, createdAt }) => {
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
          <IconButton size="small">
            <Launch />
          </IconButton>
        </Stack>
        <Typography variant="caption"> Created at: {createdAt} </Typography>
      </Stack>
    </Grid>
  );
};

export default BoardItemCard;
