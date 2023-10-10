import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Logo from './Logo';
import logoh from '../assets/logoh.png';
import { ScreenOrientationContext } from '../ScreenOrientationContext';

const useStyles = makeStyles((theme) => ({
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
        textAlign: 'justify',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        height: '26vh',
        padding: '4vh 0px 4vh 0px',
    },
}));

export default function Presentation(props) {
    const classes = useStyles();

    const handleOnClick = () => {
        props.onClick(props.quizId);
        props.setNext(true);
    };

    const orientation = useContext(ScreenOrientationContext);

    const [height, setHeight] = useState(() => {
        if (orientation === 'portrait') {
            return '26vh';
        } else {
            return '40vh';
        }
    });

    useEffect(() => {
        if (orientation === 'portrait') {
            setHeight('26vh');
        } else {
            setHeight('40vh');
        }
    }, [orientation]);

    return (
        <Fragment>
            <Box id={props.index} key={props.index}>
                <Box
                    className={classes.logo}
                    id={props.index}
                    style={{
                        height: height,
                    }}
                >
                    <img
                        src={logoh}
                        alt="header"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
                <Box className={classes.question}>
                    <Typography
                        variant="h1"
                        style={{
                            padding: '20px 20%',
                            textAlign: 'center',
                        }}
                    >
                        Vamos descobrir qual o curso mais combina com você?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOnClick}
                    >
                        Vamos começar
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
}
