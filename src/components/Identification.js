import React, { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const useStyles = makeStyles((theme) => ({
    keyboard: {
        [theme.breakpoints.up('sm')]: {
            width: '600px',
        },
        [theme.breakpoints.up('md')]: {
            width: '800px',
        },
        marginTop: '50px',
    },
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


export default function Form({onSubmit}) {
    const classes = useStyles();
    const [layoutName, setLayoutName] = useState("default");
    const [input, setInput] = useState("");
    const keyboardRef = useRef(null);
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSubmit(input);
        };
    };

    const onChange = input => {
        setInput(input);
    };

    const onKeyPress = button => {
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();

        if (button === "{enter}") handleEnter();
    };

    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };

    const handleEnter = button => {
        onSubmit(input);
        console.log("Button pressed", button);
    };

    const onChangeInput = event => {
        const input = event.target.value.toUpperCase();
        setInput(input);
        keyboardRef.current.setInput(input);
    };

    return (
        <Fragment>
            <motion.div
                initial={{ x: "50vh" }}
                animate={{ x: 0 }}
                transition={{ stiffness: 150 }}
            >
                <Box className={classes.question}>
                    <Typography variant="h1">Qual seu nome?</Typography>
                    <TextField label="Seu nome" value={input.toUpperCase()} onKeyDown={handleKeyDown} onSubmit={onSubmit} onChange={(e) => setInput(e.target.value)} variant="outlined" />
                </Box>
                <Keyboard
                    theme={"hg-theme-default " + classes.keyboard}
                    keyboardRef={r => (keyboardRef.current = r)}
                    layoutName={layoutName}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={true}
                />
            </motion.div>
        </Fragment>
    )
}