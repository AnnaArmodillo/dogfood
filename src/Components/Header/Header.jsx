import classNames from 'classnames';
import { func } from 'prop-types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Components/logo.jpg';
import headerStyle from './header.module.css';
export function Header() {
    console.log('render header');
    const [isSearchActive, setIsSearchActive] = useState(false);
    function clickSearchHandler() {
        setIsSearchActive(true);
    }
    function closeSerachHandler() {
        setIsSearchActive(false);
    }
    return (
        <ul className={headerStyle.header}>
            <li>
                <NavLink
                    className={headerStyle.logoWrapper}
                    to='/'
                >
                    <img
                        className={headerStyle.logo}
                        src={logo}
                        alt='logo'
                    />{' '}
                    DogFood
                </NavLink>
            </li>
            <li>{isSearchActive ? <div className={headerStyle.searchWrapper}>
                <div
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className={headerStyle.search}
                    type='text'
                ></div>
                <i onClick={closeSerachHandler}
                    className={classNames(
                        'fa-solid fa-circle-xmark',
                        headerStyle.searchCloseButton
                    )}
                ></i>
            </div> : <i onClick={clickSearchHandler} className={classNames(
                'fa-solid fa-magnifying-glass',
                headerStyle.searchOpenButton
            )}></i>}

            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        classNames({ [headerStyle.activeLink]: isActive }, [
                            headerStyle.link,
                        ])
                    }
                    to='/favourite'
                >
                    <i className="fa-regular fa-heart"></i>
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        classNames({ [headerStyle.activeLink]: isActive }, [
                            headerStyle.link,
                        ])
                    }
                    to='/signup'
                >
                    Регистрация
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        classNames({ [headerStyle.activeLink]: isActive }, [
                            headerStyle.link,
                        ])
                    }
                    to='/signin'
                >
                    Вход
                </NavLink>
            </li>
        </ul>
    );
}
