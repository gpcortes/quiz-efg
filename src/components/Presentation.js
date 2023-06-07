import React, { Fragment } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

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
        [theme.breakpoints.up('md')]: {
            margin: '0 auto',
            width: '60%',
        },
    },
}));

export default function Presentation(props) {
    const classes = useStyles();

    const handleOnClick = () => {
        props.onClick(props.quizId);
        props.setNext(true);
    };

    return (
        <Fragment>
            <Box id={props.index} key={props.index}>
                <Box className={classes.logo} id={props.index}>
                    <Logo />
                </Box>
                <Box className={classes.question}>
                    <Typography
                        variant="h1"
                        style={{
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
