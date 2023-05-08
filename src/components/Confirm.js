import React from "react";
import { Fragment } from "react";
import parse from 'html-react-parser';
import { Button, Box, List, ListItem, ListItemText, Typography, Link } from "@material-ui/core";
import { QRCodeSVG } from 'qrcode.react';
import { makeStyles } from "@material-ui/core/styles";

const courses = [
  {
    option: "a",
    title: "Aprendizado de Máquina",
    curses: ["Aprendizado de Máquina"],
    description: "<p>Voc&ecirc; &eacute; uma pessoa que cumpre os procedimentos e estabelece crit&eacute;rios para realizar as atividades de sua vida cotidiana. Por buscar agilidade e automa&ccedil;&atilde;o nas diferentes esferas da sua vida, &eacute; uma pessoa curiosa nas possibilidades tecnol&oacute;gicas de otimiza&ccedil;&atilde;o do tempo e organiza&ccedil;&atilde;o das tarefas. Por isso, a intelig&ecirc;ncia artificial desperta a sua curiosidade, pois pode te ajudar a utilizar m&eacute;todos computacionais para ensinar os computadores a aprender com a experi&ecirc;ncia, sem depender de modelos pr&eacute;-determinados e resolver grande parte dos seus problemas.</p>",
    url: "https://selecao2.cett.org.br/efg/formulario-inscricao-v2",
  },
  {
    option: "b",
    title: "Desenvolvimento Web e Mobile",
    curses: ["Desenvolvimento Web e Mobile"],
    description: "<p>Voc&ecirc; &eacute; uma pessoa bem-informada sobre as novas tecnologias e nos diferentes recursos inovadores para a sua vida cotidiana. Pensar em sistemas e na constru&ccedil;&atilde;o de novos softwares &eacute; sua principal habilidade! Por esta raz&atilde;o, aprender a desenvolver sites, aplicativos, softwares, banco de dados e outras ferramentas da internet, atrav&eacute;s da linguagem de programa&ccedil;&atilde;o, pode te ajudar em sua carreira profissional e na sua vida pessoal.</p>",
    url: "https://selecao2.cett.org.br/efg/formulario-inscricao-v2",
  },
  {
    option: "c",
    title: "Empresas Digitais",
    curses: ["Empresas Digitais"],
    description: "<p>Sua mente empreendedora poder&aacute; te ajudar no controle do tempo, comando e execu&ccedil;&atilde;o de diferentes atividades relacionadas ao empreendedorismo. Por isto, planejar e criar novos neg&oacute;cios (Start ups) para atuar no mercado digital, utilizando diferentes t&eacute;cnicas para promover o seu sucesso, pode ser uma boa alternativa profissional para voc&ecirc;!</p>",
    url: "https://selecao2.cett.org.br/efg/formulario-inscricao-v2",
  },
  {
    option: "d",
    title: "Economia Criativa",
    curses: ["Economia Criativa"],
    description: "<p>Sua mente criativa pode te ajudar a pensar em solu&ccedil;&otilde;es empreendedoras e relacionadas &agrave; inova&ccedil;&atilde;o e tecnologia para diferentes pessoas de todos os n&iacute;veis sociais e culturais. Por ter afinidade com a economia, &eacute; fundamental que voc&ecirc; aprenda a empreender, de forma criativa, nos diferentes setores culturais e tecnol&oacute;gicos, por meio dos princ&iacute;pios da economia circular e das tecnologias 4.0 e 5.0.</p>",
    url: "https://selecao2.cett.org.br/efg/formulario-inscricao-v2",
  },
  {
    option: "e",
    title: "Marketing e Mídias Sociais",
    curses: ["Marketing e Mídias Sociais"],
    description: "<p>Sua personalidade influenciadora revela muito sobre as suas habilidades de discurso, argumenta&ccedil;&atilde;o e persuas&atilde;o em prol de algum produto ou ideal que voc&ecirc; acredita. Por isso, o marketing pode te ajudar a realizar o planejamento, a cria&ccedil;&atilde;o e a gest&atilde;o de tr&aacute;fego digital, m&iacute;dias e produtos digitais em diferentes plataformas digitais e redes sociais.</p>",
    url: "https://selecao2.cett.org.br/efg/formulario-inscricao-v2",
  }
];

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  listCourses: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexWrap: "wrap",
    // backgroundColor: "#fafafa",
  },
  result: {
    display: "flex",
    ["@media (max-width: 768px)"]: {
      flexDirection: "column",
      alignItems: "center",
    },
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3)
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "23rem",
    // height: "rem",
    padding: theme.spacing(3.5),
    // backgroundColor: "#fafafa",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(2)
    },
  },
  qrcode: {
    textAlign: "center",
    ["@media (max-width: 768px)"]: {
      display: "none",
    },
  },
  link: {
    textAlign: "center",
    ["@media (min-width: 769px)"]: {
      display: "none",
    },
  },
}));

export default function ConfirmPage({ answers }) {

  const classes = useStyles();

  const answer = answers.reduce(function (acc, e) { acc[e] = (e in acc ? acc[e] + 1 : 1); return acc }, {});

  const option = Object.keys(answer).reduce(function (acc, e) {
    if (answer[e] > acc.answer) {
      acc.answer = answer[e];
      acc.option = e;
    }
    return acc;
  });

  const reload = () => {
    window.location.reload();
  }

  return (
    <Fragment>
      <Box className={classes.header}>
        <Typography variant="h1">PARABÉNS!</Typography>
      </Box>
      {courses.map((course, i) => {
        if (course.option === option) {
          return (
            <Box>
              <Box>
                <br />
                <Typography variant="h2">Seu curso é {course.title}</Typography>
                <br />
                <Typography>{parse(course.description)}</Typography>
                <br />
              </Box>
              <Box className={classes.result}>
                <Box className={classes.card}>
                  <Typography variant="h2" style={{
                    textAlign: "center",
                  }}>Conheça nossas escolas</Typography>
                  <br />
                  <Box className={classes.qrcode}>
                    <QRCodeSVG value={course.url} bgColor="none" size="256" level="H" />
                  </Box>
                  <Box className={classes.link}>
                    <Button href={course.url} variant="contained" color="primary">Inscreva-se</Button>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.footer}>
                <Button variant="contained" color="primary" onClick={reload} >Recomeçar</Button>
              </Box>
            </Box>
          )
        }
      }
      )}
    </Fragment >
  );
}
