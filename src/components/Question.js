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
}));

export default function Question(props) {
    const classes = useStyles();
    const [value, setValue] = useState(
        props.question.prefix
            ? props.question.prefix + props.value
            : props.value
    );
    const [isValid, setIsValid] = useState(true);

    const [keyboardLayout, setKeyboardLayout] = useState(props.question.type);

    const handleSendAnswer = () => {
        props.sendValue(props.question.id, value, props.question.weigh);
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
        if (props.question.type === 'SingleOption') {
            props.setNext(true);
        }
    };

    const handleSelect = (nextQuestion) => props.setNextQuestion(nextQuestion);

    function shuffleOptions(question) {
        const { options, shuffle } = question;
        if (shuffle) {
            const shuffledOptions = [...options];
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOptions[i], shuffledOptions[j]] = [
                    shuffledOptions[j],
                    shuffledOptions[i],
                ];
            }
            return { ...question, options: shuffledOptions };
        }
        return question;
    }

    const shuffledQuestion = shuffleOptions(props.question);

    return (
        <Fragment>
            {shuffledQuestion.type === 'SingleOption' && (
                <Box
                    className={classes.question}
                    onChange={handleChange}
                    type={shuffledQuestion.type}
                >
                    <Typography variant="h1">
                        {props.index}. {shuffledQuestion.title}
                    </Typography>
                    <RadioGroup aria-label="question" name="question">
                        {shuffledQuestion.options.map((option, idx) => (
                            <FormControlLabel
                                className={classes.answer}
                                key={idx}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                onChange={() => {
                                    if (option.nextQuestion) {
                                        handleSelect(option.nextQuestion);
                                    } else {
                                        handleSelect(null);
                                    }
                                }}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            )}
            {shuffledQuestion.type === 'SelectOption' && (
                <Box className={classes.question} type={shuffledQuestion.type}>
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
                            {shuffledQuestion.options.map((option, idx) => (
                                <MenuItem
                                    className={classes.menuItem}
                                    key={idx}
                                    value={option.value}
                                    onClick={() => {
                                        if (option.nextQuestion) {
                                            handleSelect(option.nextQuestion);
                                        } else {
                                            handleSelect(null);
                                        }
                                    }}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button onClick={handleClick}> Enviar </Button>
                    </ButtonGroup>
                </Box>
            )}
            {shuffledQuestion.type === 'Text' && (
                <Box className={classes.question} type={shuffledQuestion.type}>
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
            {shuffledQuestion.type === 'Phone' && (
                <Box className={classes.question} type={shuffledQuestion.type}>
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
        </Fragment>
    );
}
