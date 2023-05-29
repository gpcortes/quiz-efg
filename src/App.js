import React, { Fragment } from 'react';
import TypeForm from './TypeForm';
import Presentation from './components/Presentation';
import Question from './components/Question';
import questions from './components/Questions';
import ConfirmPage from './components/Confirm';

export default function App() {
    return (
        <Fragment>
            <TypeForm>
                <Presentation />
                {questions.map((question, idx) => (
                    <Question question={question} key={idx} id={question.id} />
                ))}
                <ConfirmPage />
            </TypeForm>
        </Fragment>
    );
}
