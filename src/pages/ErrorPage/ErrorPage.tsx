import React from 'react';
import { Link } from 'react-router-dom';
import cl from 'clsx';
import s from './ErrorPage.module.scss';
import { Routes } from '../../const';

const ErrorPage = () => (
  <div className={cl(s.error404)}>
    <p>Page not found</p>
    <Link className={cl(s.error404__link)} to={Routes.HOME}>
      Go to home page
    </Link>
  </div>
);

export default ErrorPage;
