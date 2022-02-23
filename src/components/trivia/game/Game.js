import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../../reusable/question/Question';
import './Game.css';

export const Game = ({ questions, level, isOver, onResponse, earnings, goHome }) => {
  const [timer, setTimer] = useState(30);
  const [answer, setAnswer] = useState(false);
  const timerId = useRef(null);
  const timeOutId = useRef(null);

  useEffect(() => {
    if (timer === 30) {
      timerId.current = setInterval(() => setTimer((time) => time - 1), 1000);
      return;
    }
    if (timer === 0 && timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
      timeOutId.current = setTimeout(() => {
        onResponse(answer);
        if (!isOver) {
          setAnswer(false);
          setTimer(30);
        }
      }, 3000);
    }
  }, [answer, isOver, onResponse, timer]);

  useEffect(() => () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
    if (timeOutId.current) {
      clearInterval(timeOutId.current);
      timeOutId.current = null;
    }
  }, []);

  return (
    <div className='inner-game-container'>
      {isOver ? (
        <>
          <div className='game-over' onClick={goHome}>Game over</div>
          <div className='earnings-resume'>You earned ${earnings.toLocaleString()}</div>
        </>
      ) : (
        <div className='timer'>
          <div className='timer-circle'>{timer}</div>
        </div>
      )}
      {!isOver && (
        <Question
          question={questions[level - 1]}
          onResponse={(isCorrect) => {
            setAnswer(isCorrect)
            setTimer(0);
          }}
        />
      )}
    </div>
  )
}
