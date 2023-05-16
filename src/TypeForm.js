import React, { Fragment, useState, useRef } from "react";
import { Container, FormControl, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';



const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        },
    },
    formControl: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    keyboard: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
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

export default function TypeForm(props) {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [layoutName, setLayoutName] = useState("default");
    const [formValues, setFormValues] = useState({});
    const [keyboard, setKeyboard] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const keyboardRef = useRef(null)


    const children = React.Children.map(props.children, (child) => {
        return child;
    });

    const nextField = () => {
        if (index < children.length) setIndex((prev) => prev + 1);
    }

    // const prevField = () => {
    //     if (index > 0) setIndex((prev) => prev - 1);
    // };

    const onKeyPress = button => {
        if (button === "{shift}" || button === "{lock}") handleShift();

        if (button === "{enter}") handleEnter();
    };

    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };

    const handleEnter = button => {
        nextField();
    };

    const handleSetFieldValues = (value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [index]: value,
        }));
    };

    const handleSetQuizAnswers = (value) => {
        setQuizAnswers((prevQuizAnswers) => ([
            ...prevQuizAnswers,
            value,
        ]));
    };

    const handleNextField = (value) => {
        const trimmedValue = String(value).trim();
        if (trimmedValue !== "") {
            handleSetFieldValues(trimmedValue.toUpperCase());
        }
        nextField();
    };

    const onSubmit = (value) => {
        handleSetQuizAnswers(value);
        console.log(formValues);
    };

    // const numLayout = {
    //     default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
    //     shift: ["! @ #", "$ % ^", "& * (", "{shift} ) {bksp}"]
    // };

    return (
        <Fragment>
            <Container className={classes.container}>
                <form onSubmit={onSubmit}>
                    <FormControl className={classes.formControl}>
                        <motion.div
                            initial={{ x: "50vh" }}
                            animate={{ x: 0 }}
                            transition={{ stiffness: 150 }}
                        >
                            {React.cloneElement(children[index], {
                                ...props,
                                index: index,
                                setKeyboard: setKeyboard,
                                answers: quizAnswers,
                                setAnswers: handleSetQuizAnswers,
                                onChange: handleNextField,
                                value: formValues[index] || "",
                            })}
                        </motion.div>
                        {keyboard && (
                            <Keyboard
                                theme={"hg-theme-default " + classes.keyboard}
                                keyboardRef={r => (keyboardRef.current = r)}
                                layoutName={layoutName}
                                onKeyPress={onKeyPress}
                                onChange={handleSetFieldValues}
                                inputName={`field${index}`}
                                physicalKeyboardHighlight={true}
                                // layout={numLayout}
                                mergeDisplay={true}
                                display={{
                                    '{bksp}': 'Corrigir',
                                    '{enter}': ' Enviar ',
                                }}
                            />
                        )}
                    </FormControl>
                </form>
            </Container>
        </Fragment >
    );
}
