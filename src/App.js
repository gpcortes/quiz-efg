import "./styles.css";
import Question from "./components/Question";
import TypeForm from "./TypeForm"
import React, { Fragment, useState, useEffect } from "react";
import questions from "./components/Questions";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function App() {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    function handleOrientationChange() {
      setIsPortrait(window.innerHeight > window.innerWidth);
    }

    function handleResize() {
      setIsPortrait(window.innerHeight > window.innerWidth);
    }

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const classes = useStyles();

  const [fields, setFields] = useState(0);

  const [answers, setAnswers] = useState([]);

  const handleChange = (event) => {
    setFields(fields + 1);
  }

  const handleClick = (event) => {
    setFields(fields + 1);
  }
  return (
    <Fragment>
      <Container className={classes.container}>
        {/* {isPortrait ? <p>Modo portrait</p> : <p>Modo landscape</p>} */}
        <TypeForm fields={fields} setFields={setFields} answers={answers} onSubmit={handleClick}>
          {questions.map((question, index) => (
            <Question key={index} index={index} question={question} shuffle={question.shuffle} onChange={handleChange} answers={answers} setAnswers={setAnswers} />
            ))}
        </TypeForm>
      </Container>
    </Fragment>
  );
}
