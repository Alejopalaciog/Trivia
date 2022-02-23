import React, { useEffect, useState } from 'react';
import './Question.css';

export const Question = ({ question, onResponse }) => {
  const [options, setOptions] = useState([...question.incorrect_answers, question.correct_answer].sort(() => Math.random() > 0.5 ? -1 : 1));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setOptions([...question.incorrect_answers, question.correct_answer].sort(() => Math.random() > 0.5 ? -1 : 1));
    setSelected(null);
  }, [question]);

  return (
    <div className='question-block'>
      <div className='question' dangerouslySetInnerHTML={{ __html: question.question }}></div>
      <div className='options-block'>

        {options.map((option, i) => (
          <div
            key={`option-${i}`}
            className={`options-block__option ${(option === selected) ? ((selected === question.correct_answer) ? 'correct' : 'incorrect') : ''}`}
            onClick={() => {
              if (!selected) {
                setSelected(option);
                onResponse(option === question.correct_answer);
              }
            }}
            dangerouslySetInnerHTML={{ __html: option }}
          >
          </div>
        ))}
      </div>
    </div>
  );
};
