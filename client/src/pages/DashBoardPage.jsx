import { Box, Typography } from "@mui/material";
import React from "react";

const DashBoardPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "250px",
        mt: 10,
      }}
    >
      <Typography variant="h3">
        This page is only allowed for logged in users
      </Typography>
    </Box>
  );
};
export default DashBoardPage;
