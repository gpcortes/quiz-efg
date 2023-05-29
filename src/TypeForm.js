import React, { Fragment, useState, useEffect } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import 'react-simple-keyboard/build/css/index.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        },
    },
}));

export default function TypeForm(props) {
    const classes = useStyles();
    const [index, setIndex] = useState(0);
    const [formValues, setFormValues] = useState([]);
    const [next, setNext] = useState(false);
    const [nextQuestion, setNextQuestion] = useState(null);

    const findChildIndexById = (id) => {
        let foundIndex = -1;
        React.Children.forEach(props.children, (child, idx) => {
            if (child.props.id === id) {
                foundIndex = idx;
            }
        });
        return foundIndex;
    };

    useEffect(() => {
        if (next) {
            setNext(false);
            nextField();
        }
    }, [next]);

    const nextField = () => {
        if (nextQuestion !== null)
            setIndex(() => {
                const indexQuestion = findChildIndexById(nextQuestion);
                if (indexQuestion < 0) {
                    setIndex((prev) => prev + 1);
                }
                return indexQuestion;
            });
        if (nextQuestion === null && index < children.length)
            setIndex((prev) => prev + 1);
        if (index >= children.length) {
            console.log(formValues);
            // window.location.reload(true);
        }
    };

    // const prevField = () => {
    //     if (index > 0) setIndex((prev) => prev - 1);
    // };

    const handleSetFieldValues = (id, value, weigh) => {
        const trimmedValue = String(value).trim();
        const fieldValue = {
            id: id,
            value: trimmedValue,
            weigh: weigh,
        };
        if (fieldValue.value !== '') {
            setFormValues((prevFormValues) => {
                const newFormValues = prevFormValues.slice();
                newFormValues[index] = fieldValue;
                return newFormValues;
            });
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const api = axios.create({
            baseURL: process.env.QUIZ_BACKEND_BASEURL,
        });

        api.interceptors.request.use((config) => {
            const token = process.env.QUIZ_AUTH_JWT_TOKEN;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        try {
            const response = await api.post('/endpoint', formValues);

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const children = React.Children.map(props.children, (child, idx) => {
        return (
            <motion.div
                initial={{ x: '75vh', opacity: 0 }}
                animate={{ x: 0, opacity: idx === index ? 1 : 0 }}
                transition={{
                    stiffness: 150,
                    duration: 0.35,
                    ease: 'easeInOut',
                }}
            >
                {React.cloneElement(child, {
                    ...props,
                    index: index,
                    value: formValues[index] || '',
                    sendValue: handleSetFieldValues,
                    next: next,
                    setNext: setNext,
                    answers: formValues,
                    nextQuestion: nextQuestion,
                    setNextQuestion: setNextQuestion,
                })}
            </motion.div>
        );
    });

    return (
        <Fragment>
            <Container className={classes.container}>
                <form onSubmit={onSubmit}>{children[index]}</form>
            </Container>
        </Fragment>
    );
}
