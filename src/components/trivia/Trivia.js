import React, { useContext, useEffect, useState } from 'react';
import { TriviaContext, NameContext, DifficultyContext } from '../../contexts';
import { AiFillHome } from "react-icons/ai";
import { Badge } from '../reusable/badge/badge';
import { useHistory } from 'react-router';
import { Game } from './game/Game';
import axios from 'axios';
import './Trivia.css';

const levels = [
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000,
  9000,
  10000
]

export const Trivia = () => {
  const { triviaUrl, setTriviaUrl } = useContext(TriviaContext);
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  const { name, setName } = useContext(NameContext);
  const [questions, setQuestions] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const history = useHistory();

  useEffect(() => {
    if (!triviaUrl) {
      return;
    }
    axios.get(triviaUrl).then(({ data }) => {
      if (data.response_code === 0) {
        setQuestions(data.results);
      }
    });
  }, [triviaUrl]);

  const goHome = () => {
    setName('');
    setTriviaUrl('');
    setDifficulty('');
    history.push('/');
  }

  return (
    <div className='trivia-container'>
      <div className='header-container'>
        <button className='header-container__home-button' onClick={goHome}>
          <AiFillHome size='24px' color='#FFF' />
        </button>
        <div className='header-data'>
          {name && <div>{name}</div>}
          {difficulty && <div>{difficulty.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter.toLowerCase()).join('')}</div>}
          <div>Earnings: ${earnings.toLocaleString()}</div>
        </div>
      </div>
      <div className='game-container'>
        {questions.length ? (
          <>
            <div className='game-container__level-count'>
              {[...levels].map((value, i) => (
                <Badge key={`badge-${i}`} isSelected={level === i + 1} displayText={`${i + 1}. $${value.toLocaleString()}`} />))
              }
            </div>
            <div className='game-container__questions'>
              {!hasStarted ? (
                <StartButton onChage={() => setHasStarted(true)} />
              ) : (
                <Game
                  onResponse={(isCorrect) => {
                    if (isCorrect) { setEarnings((prev) => prev + levels[level - 1]); }
                    setLevel((prevLevel) => isCorrect ? (prevLevel + 1) : 11);
                  }}
                  level={level}
                  questions={questions}
                  isOver={level > questions.length}
                  earnings={earnings}
                  goHome={goHome}
                />
              )}
            </div>
          </>
        ) : (
          <div className='no-question-message' onClick={() => { history.push('/'); }}>
            Questions could not be loaded, go back
          </div>
        )
        }
      </div>
    </div>
  )
}

const StartButton = ({ onChage }) => (
  <div className='start-button-container'>
    <button className='game-container__start-button' onClick={onChage}>
      Start
    </button>
  </div>
)
