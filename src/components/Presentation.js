import React, { Fragment } from "react";
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
        [theme.breakpoints.up('md')]: {
            margin: "0 auto",
            width: "60%",
        },
    },
}));

export default function Presentation(props) {
    const classes = useStyles();

    return (
        <Fragment>
            <Box className={classes.logo} >
                <Logo />
            </Box>
            <Box className={classes.question}>
                <Typography variant="h1" style={{
                    textAlign: "center",
                }}>Vamos descobrir qual o curso mais combina com você?</Typography>
                <Button variant="contained" color="primary" onClick={props.onChange}>Vamos começar</Button>
            </Box>
        </Fragment>
    );
}