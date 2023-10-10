import React from 'react';
import { Fragment , useContext, useEffect, useState} from 'react';
import parse from 'html-react-parser';
import { Button, Box, Typography } from '@material-ui/core';
import { QRCodeSVG } from 'qrcode.react';
import { makeStyles } from '@material-ui/core/styles';
import logoh from '../assets/logoh.png';
import { ScreenOrientationContext } from '../ScreenOrientationContext';

const courses = [
    {
        choice: 'a',
        title: 'Aprendizado de Máquina',
        curses: ['Aprendizado de Máquina'],
        description:
            '<p>Voc&ecirc; &eacute; uma pessoa que cumpre os procedimentos e estabelece crit&eacute;rios para realizar as atividades de sua vida cotidiana. Por buscar agilidade e automa&ccedil;&atilde;o nas diferentes esferas da sua vida, &eacute; algu&eacute;m que busca nas possibilidades tecnol&oacute;gicas, a otimiza&ccedil;&atilde;o do tempo e a organiza&ccedil;&atilde;o das tarefas. A intelig&ecirc;ncia artificial desperta sua curiosidade! E voc&ecirc; sabe o que ela &eacute; capaz de fazer? Por meio da intelig&ecirc;ncia artificial e seus m&eacute;todos os computadores s&atilde;o ensinados a resolverem problemas, a partir da experi&ecirc;ncia, sem depender de modelos pr&eacute;-determinados. Um curso de Aprendizado de M&aacute;quinas &eacute; a chave para turbinar sua carreira profissional. Ela te ajudar&aacute; a dominar essa t&eacute;cnica. Inscreva-se j&aacute;. </p>',
        url: 'https://efg.org.br/fale-conosco/unidades',
    },
    {
        choice: 'b',
        title: 'Desenvolvimento Web e Mobile',
        curses: ['Desenvolvimento Web e Mobile'],
        description:
            '<p>Voc&ecirc; &eacute; uma pessoa bem-informada sobre novas tecnologias e recursos inovadores para a vida cotidiana. Pensar em sistemas e na constru&ccedil;&atilde;o de novos softwares &eacute; sua principal habilidade! Aprender a desenvolver sites, aplicativos, softwares, banco de dados e outras ferramentas da internet, atrav&eacute;s da linguagem de programa&ccedil;&atilde;o, &eacute; o caminho para sua carreira profissional. Que tal conhecer mais sobre Desenvolvimento Web e Mobile? Fa&ccedil;a j&aacute; sua inscri&ccedil;&atilde;o. </p>',
        url: 'https://efg.org.br/fale-conosco/unidades',
    },
    {
        choice: 'c',
        title: 'Empresas Digitais',
        curses: ['Empresas Digitais'],
        description:
            '<p>Sua mente empreendedora te ajuda no controle do tempo e no comando e execu&ccedil;&atilde;o de diferentes atividades relacionadas ao empreendedorismo. Planejar e criar neg&oacute;cios para atuar no mercado digital, utilizando diferentes t&eacute;cnicas para promover o seu sucesso, pode ser uma boa alternativa profissional para voc&ecirc;! Inscreva-se j&aacute; no curso Empresas Digitais! Ele tem a sua cara. Inscreva-se agora mesmo. </p>',
        url: 'https://efg.org.br/fale-conosco/unidades',
    },
    {
        choice: 'd',
        title: 'Economia Criativa',
        curses: ['Economia Criativa'],
        description:
            '<p>Sua mente criativa te ajuda a pensar em solu&ccedil;&otilde;es empreendedoras e relacionadas &agrave; inova&ccedil;&atilde;o e tecnologia. Sabe o que mais falta para voc&ecirc; deslanchar nessa carreira? Afinidade com economia criativa! Esse &eacute; um dos caminhos para que voc&ecirc; aprenda a empreender, nos diferentes setores culturais e tecnol&oacute;gicos, por meio dos princ&iacute;pios da economia circular e das tecnologias 4.0 e 5.0. N&atilde;o perca a chance e se inscreva agora mesmo no curso de Economia Criativa.</p>',
        url: 'https://efg.org.br/fale-conosco/unidades',
    },
    {
        choice: 'e',
        title: 'Marketing e Mídias Sociais',
        curses: ['Marketing e Mídias Sociais'],
        description:
            '<p>Sua personalidade influenciadora revela muito sobre suas habilidades de discurso, argumenta&ccedil;&atilde;o e persuas&atilde;o em prol de algum produto ou ideal que voc&ecirc; acredita. Sabe o que mais voc&ecirc; precisa para incrementar suas habilidades? Um curso de Marketing e M&iacute;dias Sociais! Ele te capacita sobre como realizar planejamento, cria&ccedil;&atilde;o e gest&atilde;o de m&iacute;dias, produtos e tr&aacute;fego digitais, em diferentes plataformas e redes sociais. Inscreva-se agora mesmo. </p>',
        url: 'https://efg.org.br/fale-conosco/unidades',
    },
];

const useStyles = makeStyles((theme) => ({
    logo: {
        ['@media (min-width:769px)']: {
            margin: '0 auto',
            // height: '26vh',
        },
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },

    listCourses: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        // backgroundColor: "#fafafa",
    },
    result: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(3),
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '28rem',
        // height: "rem",
        padding: theme.spacing(3.5),
        // backgroundColor: "#fafafa",
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    qrcode: {
        textAlign: 'center',
        // [theme.breakpoints.down('sm')]: {
        //     display: 'none',
        // },
    },
    link: {
        textAlign: 'center',
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },
}));

export default function ConfirmPage(props) {
    const classes = useStyles();

    const answer = props.answers
        .filter((field) => field.weight)
        .reduce(function (acc, field) {
            acc[field.value] = field.value in acc ? acc[field.value] + 1 : 1;
            return acc;
        }, {});

    const choice = Object.keys(answer).reduce(function (acc, e) {
        if (answer[e] > acc.answer) {
            acc.answer = answer[e];
            acc.choice = e;
        }
        return acc;
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        courses.map((course) => {
            if (course.choice === choice) {
                props.sendAnswer(
                    { title: 'Seu próximo curso é ' },
                    choice,
                    course.title
                );
            }
            return null;
        });
        // props.sendValue(choice, false);
        props.completeAnswer();
        window.location.reload(true);
    };

    if (props.answers.length === 0) {
        return <p>Carregando...</p>;
    }

    return (
        <Fragment>
            <Box className={classes.logo} style={{height: height}} >
                <img
                    src={logoh}
                    alt="logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
            </Box>

            <Box className={classes.header}>
                <Typography variant="h1">PARABÉNS!</Typography>
            </Box>
            {/* eslint-disable-next-line */}
            {courses.map((course, idx) => {
                if (course.choice === choice) {
                    return (
                        <Box key={idx}>
                            <Box>
                                <br />
                                <Typography
                                    variant="h2"
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    Seu próximo curso é {course.title}
                                </Typography>
                                <br />
                                <Typography>
                                    {parse(course.description)}
                                </Typography>
                                <br />
                            </Box>
                            <Box className={classes.result}>
                                <Box className={classes.card}>
                                    <Typography
                                        variant="h2"
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        Conheça nossas Escolas:
                                    </Typography>
                                    <br />
                                    <Box className={classes.qrcode}>
                                        <QRCodeSVG
                                            value={course.url}
                                            bgColor="none"
                                            size="256"
                                            level="H"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    );
                }
            })}
            <Box className={classes.footer}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Recomeçar
                </Button>
            </Box>
        </Fragment>
    );
}
