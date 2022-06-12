import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Confirm from "./components/Confirm";
import Presentation from "./components/Presentation";

export default function TypeForm({ children, onSubmit, fields, setFields, answers }) {

  children = [<Presentation onClick={onSubmit} />, ...children, <Confirm answers={answers} />];

  const nextField = () => {
    if (fields < children.length) setFields((prev) => prev + 1);
  };
  const prevField = () => {
    if (fields > 0) setFields((prev) => prev - 1);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        {children[fields]}

        {/* <div className={classes.navigation}>
          <ButtonGroup
            disableElevation
            size="small"
            variant="contained"
            color="primary"
          >
            {fields < children.length - 1 && fields > 0 && (
              <Button onClick={prevField}>Anterior</Button>
            )}
            {fields < children.length - 2 && (
              <Button onClick={nextField}>Proxima</Button>
            )}
            {fields === children.length - 2 && (
              <Button onClick={nextField}>Enviar</Button>
            )}
            cons.log(children);
          </ButtonGroup>
        </div> */}
      </form>
    </React.Fragment >
  );
}
