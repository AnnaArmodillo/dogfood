// eslint-disable-next-line no-unused-vars
import React from 'react';
import mainStyle from './main.module.css';

export function Main() {
  return (
    <>
      <div className={mainStyle.div}>
        Добро пожаловать в интернет-магазин еды для собак
        {' '}
        <b>DogFood</b>
        !
      </div>
      <div className={mainStyle.div}>Приятных покупок!</div>
    </>
  );
}
