import React, { Fragment, useEffect, useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    Box,
    TextField,
    Typography,
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
}));

export default function Question(props) {
    const classes = useStyles();
    const [value, setValue] = useState(
        props.question.prefix
            ? props.question.prefix + props.value
            : props.value
    );

    const [keyboardLayout, setKeyboardLayout] = useState(props.question.type);

    useEffect(() => {
        if (props.next) {
            handleSendAnswer();
        }
    }, [props.next]);

    const handleSendAnswer = () => {
        props.sendValue(value, props.question.weigh);
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
                            />
                        ))}
                    </RadioGroup>
                </Box>
            )}
            {shuffledQuestion.type === 'Text' && (
                <Box className={classes.question} type={shuffledQuestion.type}>
                    <Typography variant="h1">
                        {props.index + 1}. {shuffledQuestion.title}
                    </Typography>
                    <VirtualKeyboard
                        input={value}
                        setInput={handleChange}
                        keyboardLayout={keyboardLayout}
                        setKeyboardLayout={setKeyboardLayout}
                        setNext={props.setNext}
                        className={classes.keyboard}
                        prefix={props.question.prefix}
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
                        {props.index + 1}. {shuffledQuestion.title}
                    </Typography>
                    <VirtualKeyboard
                        input={value}
                        setInput={handleChange}
                        keyboardLayout={keyboardLayout}
                        setKeyboardLayout={setKeyboardLayout}
                        setNext={props.setNext}
                        className={classes.keyboard}
                        prefix={props.question.prefix}
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
