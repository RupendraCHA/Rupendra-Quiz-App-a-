// src/components/QuestionNavigator.js
import React, { useState, useEffect } from 'react';
import { questions } from '../data.jsx';
import QuestionDisplay from './QuestionDisplay.jsx';

const QuestionNavigator = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answerResult, setAnswerResult] = useState(null);

    useEffect(() => {
        // Read the URL parameters to set the initial question index
        const urlParams = new URLSearchParams(window.location.search);
        const questionIndex = urlParams.get('questionIndex');

        if (questionIndex) {
            setCurrentQuestionIndex(parseInt(questionIndex, 10));
        }

        // Listen for changes in localStorage to synchronize across devices
        const handleStorageChange = (event) => {
            if (event.key === 'currentQuestionIndex') {
                setCurrentQuestionIndex(parseInt(event.newValue, 10));
            }

            if (event.key === 'answerResult') {
                setAnswerResult(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleOptionClick = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        const newAnswerResult = {
            answer: selectedOption,
            correct: isCorrect,
        };

        setAnswerResult(newAnswerResult);

        // Move to the next question
        const nextQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        setCurrentQuestionIndex(nextQuestionIndex);

        // Save the state to localStorage
        localStorage.setItem('currentQuestionIndex', nextQuestionIndex);
        localStorage.setItem('answerResult', JSON.stringify(newAnswerResult));
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            {answerResult && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h3>
                        You selected: {answerResult.answer}. This answer is{' '}
                        {answerResult.correct ? 'correct!' : 'wrong!'}
                    </h3>
                </div>
            )}
            <QuestionDisplay
                question={currentQuestion.question}
                options={currentQuestion.options}
                currentQuestionIndex={currentQuestionIndex}
                onOptionClick={handleOptionClick}
            />
        </div>
    );
};

export default QuestionNavigator;
