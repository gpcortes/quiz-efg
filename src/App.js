import React, { Fragment, useEffect, useState } from 'react';
import TypeForm from './TypeForm';
import Presentation from './components/Presentation';
import Question from './components/Question';
import LoadingSpinner from './components/Loading';
import ConfirmPage from './components/Confirm';
import axios from 'axios';
import ServiceUnavailableError from './components/ServiceError';

export default function App() {
    const [quiz, setQuiz] = useState([]);
    const [previousQuestionAnswer, setPreviousQuestionAnswer] = useState(null);
    const [quizAnswer, setQuizAnswer] = useState({});
    const [error, setError] = useState(false);

    // {
    //     _id: '',
    //     answers: [
    //         {
    //             questionTitle: '',
    //             previousQuestionAnswer: '',
    //             values: [
    //                 ''
    //             ]
    //         },
    //     ],
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://quiz-adm.cett.dev.br/api/v1/assessment/quiz/500cd670-ad66-4aec-944d-f0dbdd317b68/?format=json',
                    { timeout: 5000 }
                );
                setQuiz(response.data[0]);
            } catch (error) {
                setError(true);
            }
        };

        fetchData();
    }, []);

    const getNewQuizAnswer = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://quiz-adm.cett.dev.br/api/v1/assessment/quizAnswer/' +
                        quiz._id +
                        '/create/',
                    { timeout: 5000 }
                );
                const newQuizAnswer = {
                    _id: response.data._id,
                };
                setQuizAnswer(newQuizAnswer);
            } catch (error) {
                setError(true);
            }
        };

        fetchData();
    };

    const completeQuizAnswer = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://quiz-adm.cett.dev.br/api/v1/assessment/quizAnswer/' +
                        quizAnswer._id +
                        '/complete/',
                    { timeout: 5000 }
                );
                if (response.status === 200) return;
            } catch (error) {
                setError(true);
            }
        };

        fetchData();
    };

    const sendNewQuestionAnswer = (question, key, value) => {
        const fetchData = async () => {
            try {
                const data = {
                    questionTitle: question.title,
                    previousQuestionAnswer: previousQuestionAnswer,
                    values: [
                        {
                            key: key,
                            value: value,
                        },
                    ],
                };
                const response = await axios.post(
                    'https://quiz-adm.cett.dev.br/api/v1/assessment/questionAnswer/' +
                        quizAnswer._id +
                        '/create/',
                    data,
                    { timeout: 5000 }
                );
                const newPreviousQuestionAnswer = response.data._id;
                setPreviousQuestionAnswer(newPreviousQuestionAnswer);
            } catch (error) {
                setError(true);
            }
        };

        fetchData();
    };

    useEffect(() => {
        console.log(quizAnswer);
    }, [quizAnswer]);

    if (error) return <ServiceUnavailableError />;

    if (quiz.length === 0)
        return <LoadingSpinner message="Aguarde, carregando" />;

    return (
        <Fragment>
            <TypeForm>
                <Presentation onClick={getNewQuizAnswer} quizId={quiz._id} />
                {quiz.questions.map((question, idx) => (
                    <Question
                        question={question}
                        key={idx}
                        id={question._id}
                        sendAnswer={sendNewQuestionAnswer}
                    />
                ))}
                <ConfirmPage
                    sendAnswer={sendNewQuestionAnswer}
                    completeAnswer={completeQuizAnswer}
                />
            </TypeForm>
        </Fragment>
    );
}
