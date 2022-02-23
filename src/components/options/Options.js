import React, { useContext } from 'react';
import { NameContext, TriviaContext, DifficultyContext } from '../../contexts';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Options.css';

const createTriviaUrl = (category, difficulty) => `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

export const Options = () => {
  const history = useHistory();
  const { setName } = useContext(NameContext);
  const { setTriviaUrl } = useContext(TriviaContext);
  const { setDifficulty } = useContext(DifficultyContext);
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      name: '',
      category: '9',
      difficulty: 'easy'
    },
    validationSchema: yup.object().shape({
      name: yup.string().min(4, '4 Characters minimum').max(15, '15 Characters maximum').required('Name is required'),
      category: yup.string().required('Category is required'),
      difficulty: yup.string().required('Difficulty is required')
    }),
    onSubmit: async (values) => {
      setName(values.name);
      setDifficulty(values.difficulty);
      setTriviaUrl(createTriviaUrl(values.category, values.difficulty));
      history.push('/trivia');
    }
  });

  return (
    <div className='options-container'>
      <div className='form-card'>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Trivia</h3>
        <form className='options-form' onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
          <div className='input'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              {...getFieldProps('name')}
            />
          </div>
          <div className='input'>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              placeholder='Select a category'
              className='category__select'
              {...getFieldProps('category')}
            >
              <option value='9' className='category__option'>General Knowledge</option>
              <option value='18' className='category__option'>Computers</option>
              <option value='14' className='category__option'>Television</option>
              <option value='15' className='category__option'>Videogame</option>
              <option value='20' className='category__option'>Mythology</option>
            </select>
          </div>
          <div className='input'>
            <label htmlFor='difficulty'>Difficulty</label>
            <select
              id='difficulty'
              placeholder='Select a difficulty'
              value=''
              {...getFieldProps('difficulty')}
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          <div className='button-container'>
            <button className='button-container__button'>Start</button>
          </div>
          { (errors.name && touched.name) && <div className='error-container'>Name is required</div>}
        </form>
      </div>
    </div>
  )
}
