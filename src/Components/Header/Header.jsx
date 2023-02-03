import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearToken, getTokenSelector } from '../../redux/slices/tokenSlice';
import { clearUserID } from '../../redux/slices/userIDSlice';
import logo from '../logo.jpg';
import headerStyle from './header.module.css';

export function Header() {
  console.log('render header');
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);
  const { clearClient } = useQueryClient(QueryClientProvider);
  const [isSearchActive, setIsSearchActive] = useState(false);
  function clickSearchHandler() {
    setIsSearchActive(true);
  }
  function closeSearchHandler() {
    setIsSearchActive(false);
  }
  function logoutHandler() {
    dispatch((clearToken()));
    dispatch((clearUserID()));
    setTimeout(clearClient);
  }
  return (
    <ul className={headerStyle.header}>
      <li>
        <NavLink
          className={headerStyle.logoWrapper}
          to="/"
        >
          <img
            className={headerStyle.logo}
            src={logo}
            alt="logo"
          />
          {' '}
          DogFood
        </NavLink>
      </li>
      <li>
        {isSearchActive ? (
          <div className={headerStyle.searchWrapper}>
            <div
              contentEditable
              suppressContentEditableWarning
              className={headerStyle.search}
              type="text"
            />
            <i
              onClick={closeSearchHandler}
              className={classNames(
                'fa-solid fa-circle-xmark',
                headerStyle.searchCloseButton,
              )}
            />
          </div>
        ) : (
          <i
            onClick={clickSearchHandler}
            className={classNames(
              'fa-solid fa-magnifying-glass',
              headerStyle.searchOpenButton,
            )}
          />
        )}
      </li>
      <li>
        <NavLink
          className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive }, [
            headerStyle.link,
          ])}
          to="/favourite"
        >
          <i className="fa-regular fa-heart" />
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive }, [
            headerStyle.link,
          ])}
          to="/signup"
        >
          Регистрация
        </NavLink>
      </li>
      {token ? (
        <li>
          <NavLink
            onClick={logoutHandler}
            className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive }, [
              headerStyle.link,
            ])}
            to="/signin"
          >
            Выход
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            className={({ isActive }) => classNames({ [headerStyle.activeLink]: isActive }, [
              headerStyle.link,
            ])}
            to="/signin"
          >
            Вход
          </NavLink>
        </li>
      )}
    </ul>
  );
}
