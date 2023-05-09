import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  question: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(2)
    },
  },
  answer: {
    textAlign: "justify",
    "& > *": {
      margin: theme.spacing(1)
    },
  },
  logo: {
    [theme.breakpoints.up('sm')]: {
      margin: "0 auto",
      width: "60%",
    },
  },
}));

export default function Presentation({ index, onClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <motion.div
        initial={{ x: "50vh" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Box className={classes.logo} >
          <Logo />
        </Box>
        <Box key={index} className={classes.question}>
          <Typography variant="h1" style={{
            textAlign: "center",
          }}>Vamos descobrir qual o curso mais combina com você?</Typography>
          <Button variant="contained" color="primary" onClick={onClick}>Vamos começar</Button>
        </Box>
      </motion.div>
    </Fragment>
  );
}