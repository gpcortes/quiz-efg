import React, { Fragment } from "react";
import logoh from "../assets/logoh.svg";
import logov from "../assets/logov.svg";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logoh: {
    ['@media (max-width:768px)']: {
      display: "none",
    },
  },
  logov: {
    ['@media (min-width:769px)']: {
      display: "none",
    },
  },
}));

export default function Logo() {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.logoh}>
        <img src={logoh} />
      </Box>
      <Box className={classes.logov}>
        <img src={logov} />
      </Box>
    </Fragment>
  );
}