import "./styles.css";
import Question from "./components/Question";
import TypeForm from "./TypeForm"
import { useState } from "react";

import questions from "./components/Questions";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    ['@media (min-width:769px)']: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  },
}));

export default function App() {
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
    <Container className={classes.container}>
      <TypeForm fields={fields} setFields={setFields} answers={answers} onSubmit={handleClick}>
        {questions.map((question, index) => (
          <Question key={index} index={index} question={question} shuffle={question.shuffle} onChange={handleChange} answers={answers} setAnswers={setAnswers} />
        ))}
      </TypeForm>
    </Container>
  );
}
