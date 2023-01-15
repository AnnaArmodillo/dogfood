import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import logo from '../../Components/logo.jpg';
import headerStyle from './header.module.css';
export function Header() {
    return (
        <>
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
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            classNames({ [headerStyle.activeLink]: isActive }, [
                                headerStyle.link,
                            ])
                        }
                        to='/signup'
                    >
                        Signup
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
                        Signin
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
