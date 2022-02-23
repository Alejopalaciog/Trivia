import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Options } from '../options/Options';
import { Trivia } from '../trivia/Trivia';
import { NameContext, TriviaContext, DifficultyContext } from '../../contexts';
import './MainContainer.css';

export const MainContainer = () => {
  const [name, setName] = useState('');
  const [triviaUrl, setTriviaUrl] = useState('');
  const [difficulty, setDifficulty] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      <TriviaContext.Provider value={{ triviaUrl, setTriviaUrl }}>
        <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
          <div className='main-container'>
            <Switch>
              <Route exact path='/'>
                <Options />
              </Route>
              <Route exact path='/trivia'>
                <Trivia />
              </Route>
              <Route path='/**'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </div>
        </DifficultyContext.Provider>
      </TriviaContext.Provider>
    </NameContext.Provider>
  )
};
