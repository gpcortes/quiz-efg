import React, { Fragment } from "react";
import { motion } from "framer-motion";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Logo from "./Logo";
import VirtualKeyboard from "./Keyboard";

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

export default function Question({ index, question, shuffle, onChange, answers, setAnswers }) {
  const classes = useStyles();

  const handleAnswers = (index, value) => {
    if (question.weigh === true) {
      setAnswers([...answers, answers[index] = value]);
    };
  }

  const handleChange = (event) => {
    handleAnswers(index, event.target.value);
    onChange(event);
  }

  const shuffleArray = (arr) => {
    if (shuffle) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    return arr;
  }

  const options = shuffleArray(question.options);

  return (
    <Fragment>
      <motion.div
        initial={{ x: "50vh" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Box className={classes.question} onChange={handleChange}>
          <Typography variant="h1" >{index + 1}. {question.title}</Typography>
          <FormControl>
            <RadioGroup aria-label="question" name="question">
              {options.map((option) => (
                  <FormControlLabel className={classes.answer} key={option.value} value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </motion.div>
    </Fragment>
  );
}