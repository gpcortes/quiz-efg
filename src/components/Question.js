import React, { Fragment } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Box, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPhoneInput from 'react-phone-input-material-ui';


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
}));

export default function Question(props) {
    const classes = useStyles();

    const handleOnChange = (event) => {
        if (props.question.weigh && props.question.weigh === true) {
            props.setAnswers(event.target.value);
        }
        props.onChange(event.target.value);
    }

    const shuffleArray = (arr) => {
        if (props.shuffle) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        return arr;
    }

    const options = shuffleArray(props.question.options);

    return (
        <Fragment>
            {(props.question.type === "RadioGroup") && (
                <Box className={classes.question} onChange={handleOnChange}>
                    {props.setKeyboard && props.setKeyboard(false)}
                    <Typography variant="h1" >{props.index}. {props.question.title}</Typography>
                    <RadioGroup aria-label="question" name="question">
                        {options.map((option) => (
                            <FormControlLabel className={classes.answer} value={option.value} control={<Radio />} label={option.label} />
                        ))}
                    </RadioGroup>
                </Box>)}
            {(props.question.type === "TextField") && (
                < Box className={classes.question}>
                    {props.setKeyboard && props.setKeyboard(true)}
                    <Typography variant="h1" >{props.index + 1}. {props.question.title}</Typography>
                    <TextField
                        disabled value={props.value}
                        variant="outlined"
                        label={props.question.label}
                        inputProps={{ style: { textTransform: "uppercase" } }} />
                </Box>)
            }
            {(props.question.type === "PhoneField") && (
                < Box className={classes.question}>
                    {props.setKeyboard && props.setKeyboard(true)}
                    <Typography variant="h1" >{props.index + 1}. {props.question.title}</Typography>
                    <ReactPhoneInput
                        defaultCountry="br"
                        disabled value={`+55${props.value}`}
                        component={TextField}
                        inputProps={{
                            label: props.question.label,
                            variant: 'outlined',
                        }}
                    />
                </Box>)
            }
        </Fragment >
    );
}