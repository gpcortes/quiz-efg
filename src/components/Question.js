import React, { Fragment, useEffect, useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
    TextField,
    Typography,
    Select,
    MenuItem,
    Button,
    ButtonGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VirtualKeyboard from './Keyboard';
import logoh from '../assets/logoh.png';

const useStyles = makeStyles((theme) => ({
    keyboard: {
        width: '800px',
    },
    question: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    answer: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    select: {
        maxHeight: 48 * 4.5 + 8,
        width: 350,
    },
    menuItem: {
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#eee',
        },
        '&:focus': {
            backgroundColor: '#eee',
        },
    },
    logoh: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    logov: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function Question(props) {
    const classes = useStyles();
    const [value, setValue] = useState(
        props.question.prefix
            ? props.question.prefix + props.value
            : props.value
    );
    const [isValid, setIsValid] = useState(true);

    const [keyboardLayout, setKeyboardLayout] = useState(
        props.question.type.name
    );

    const handleSendAnswer = () => {
        if (props.question.type.name === 'SingleOption') {
            props.question.choices.map((choice) => {
                if (choice.key === value) {
                    props.sendAnswer(props.question, choice.key, choice.value);
                }
                return null
            });
        } else {
            props.sendAnswer(props.question, props.question.type.name, value);
        }
        props.sendValue(props.question, value);
    };

    useEffect(() => {
        if (props.next) {
            handleSendAnswer();
        }
    }, [props.next]);

    const handleClick = () => {
        if (value) {
            props.setNext(true);
        } else {
            setIsValid(false);
        }
    };

    const handleChange = (event) => {
        let newEvent = {};
        if (event && event.target && event.target.value) {
            newEvent = event;
        } else {
            newEvent = {
                target: {
                    value: event,
                },
            };
        }

        setValue(newEvent.target.value);
        if (props.question.type.name === 'SingleOption') {
            props.setNext(true);
        }
    };

    const handleSelect = (nextQuestion) => props.setNextQuestion(nextQuestion);

    function shuffleOptions(question) {
        const { choices, shuffle } = question;
        if (shuffle) {
            const shuffledOptions = [...choices];
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOptions[i], shuffledOptions[j]] = [
                    shuffledOptions[j],
                    shuffledOptions[i],
                ];
            }
            return { ...question, choices: shuffledOptions };
        }
        return question;
    }

    const shuffledQuestion = shuffleOptions(props.question);

    return (
        <Fragment>
            <Box>
                <img
                    src={logoh}
                    alt="logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                    }}
                />
            </Box>
            {shuffledQuestion.type.name === 'SingleOption' && (
                <Box
                    className={classes.question}
                    onChange={handleChange}
                    type={shuffledQuestion.type.name}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <RadioGroup aria-label="question" name="question">
                        {shuffledQuestion.choices.map((choice, idx) => (
                            <FormControlLabel
                                className={classes.answer}
                                key={idx}
                                value={choice.key}
                                control={<Radio />}
                                label={choice.value}
                                onChange={() => {
                                    if (choice.next) {
                                        handleSelect(choice.next);
                                    } else {
                                        handleSelect(null);
                                    }
                                }}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            )}
            {shuffledQuestion.type.name === 'SelectOption' && (
                <Box
                    className={classes.question}
                    type={shuffledQuestion.type.name}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <ButtonGroup>
                        <Select
                            defaultValue=""
                            // variant="outlined"
                            onChange={handleChange}
                            className={classes.select}
                            error={!isValid}
                        >
                            {shuffledQuestion.choices.map((choice, idx) => (
                                <MenuItem
                                    className={classes.menuItem}
                                    key={idx}
                                    value={choice.key}
                                    onClick={() => {
                                        if (choice.next) {
                                            handleSelect(choice.next);
                                        } else {
                                            handleSelect(null);
                                        }
                                    }}
                                >
                                    {choice.value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button onClick={handleClick}> Enviar </Button>
                    </ButtonGroup>
                </Box>
            )}
            {shuffledQuestion.type.name === 'Text' && (
                <Box
                    className={classes.question}
                    type={shuffledQuestion.type.name}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <VirtualKeyboard
                        input={value}
                        setInput={handleChange}
                        keyboardLayout={keyboardLayout}
                        setKeyboardLayout={setKeyboardLayout}
                        setNext={props.setNext}
                        className={classes.keyboard}
                        prefix={props.question.prefix}
                        isValid={isValid}
                        setIsValid={setIsValid}
                    >
                        <TextField
                            className={classes.answer}
                            variant="outlined"
                            label={shuffledQuestion.label}
                            inputProps={{
                                style: {
                                    textTransform: 'uppercase',
                                },
                            }}
                        />
                    </VirtualKeyboard>
                </Box>
            )}
            {shuffledQuestion.type.name === 'Phone' && (
                <Box
                    className={classes.question}
                    type={shuffledQuestion.type.name}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <VirtualKeyboard
                        input={value}
                        setInput={handleChange}
                        keyboardLayout={keyboardLayout}
                        setKeyboardLayout={setKeyboardLayout}
                        setNext={props.setNext}
                        className={classes.keyboard}
                        prefix={props.question.prefix}
                        isValid={isValid}
                        setIsValid={setIsValid}
                    >
                        <TextField
                            className={classes.answer}
                            variant="outlined"
                            label={shuffledQuestion.label}
                        />
                    </VirtualKeyboard>
                </Box>
            )}
            {shuffledQuestion.type.name === 'PositiveIntegerNumber' && (
                <Box
                    className={classes.question}
                    type={shuffledQuestion.type.name}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <VirtualKeyboard
                        input={value}
                        setInput={handleChange}
                        keyboardLayout={keyboardLayout}
                        setKeyboardLayout={setKeyboardLayout}
                        setNext={props.setNext}
                        className={classes.keyboard}
                        prefix={props.question.prefix}
                        isValid={isValid}
                        setIsValid={setIsValid}
                    >
                        <TextField
                            className={classes.answer}
                            variant="outlined"
                            label={shuffledQuestion.label}
                            inputProps={{
                                pattern: '[0-9]*',
                                inputMode: 'numeric',
                                min: '0',
                            }}
                        />
                    </VirtualKeyboard>
                </Box>
            )}
        </Fragment>
    );
}
