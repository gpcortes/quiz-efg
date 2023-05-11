import React, { Fragment } from "react";
import Confirm from "./components/Confirm";
import Presentation from "./components/Presentation";
import Form from "./components/Identification";

export default function TypeForm({ children, onSubmit, next, fields, answers }) {

  children = [<Presentation onClick={next} />, <Form onSubmit={next} />, ...children, <Confirm answers={answers} />];

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        {children[fields]}
      </form>
    </Fragment >
  );
}
