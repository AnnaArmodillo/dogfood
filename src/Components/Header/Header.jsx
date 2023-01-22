import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext, AppSetContext } from '../../Contexts/AppContextProvider';
import logo from '../logo.jpg';
import headerStyle from './header.module.css';

export function Header() {
  console.log('render header');
  const { token } = useContext(AppContext);
  const { setToken, setUserID } = useContext(AppSetContext);
  const [isSearchActive, setIsSearchActive] = useState(false);
  function clickSearchHandler() {
    setIsSearchActive(true);
  }
  function closeSerachHandler() {
    setIsSearchActive(false);
  }
  function logoutHandler() {
    setToken('');
    setUserID('');
    useQueryClient.invalidateQueries({
      queryKey: ['products'],
    });
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
              onClick={closeSerachHandler}
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
