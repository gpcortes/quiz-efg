import React from "react";
import { Box } from "@material-ui/core";
import logoh from "../assets/logoh.png";
import logov from "../assets/logov.png";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  logoh: {
    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  logov: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },
  },
}));

export default function Logo() {
  const classes = useStyles();

  return (
    <Box style={{
      textAlign: "center",
    }}>
      <Box className={classes.logoh}>
        <img src={logoh} alt="logo" style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
        }} />
      </Box>
      <Box className={classes.logov}>
        <img src={logov} alt="logo" style={{
          width: "100%",
          height: "100%",
          textAlign: "center",
        }} />
      </Box>
    </Box>
  );
}