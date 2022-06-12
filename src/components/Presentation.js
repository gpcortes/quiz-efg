import { Fragment } from "react";
import { motion } from "framer-motion";
import FormControl from '@material-ui/core/FormControl';
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
        <Box key={index} className={classes.question}>
          <Typography variant="h1" style={{

            textAlign: "center",
          }}>Vamos descobrir qual o curso que você vai fazer sem pagar nada?</Typography>
          <Button variant="contained" color="primary" onClick={onClick}>Vamos começar</Button>
        </Box>
      </motion.div>
    </Fragment>
  );
}