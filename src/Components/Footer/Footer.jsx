import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import logo from '../logo.jpg';
import footerStyle from './footer.module.css';

export function Footer() {
  return (
    <div className={footerStyle.footer}>
      <div className={footerStyle.logoCopyright}>
        <NavLink
          className={footerStyle.logoWrapper}
          to="/"
        >
          <img
            className={footerStyle.logo}
            src={logo}
            alt="logo"
          />
          DogFood
        </NavLink>
        <div className={footerStyle.copyright}>
          © Интернет-магазин DogFood.ru
        </div>
      </div>
      <div className={footerStyle.wrapper}>
        <NavLink
          className={footerStyle.link}
          to="/products"
        >
          Каталог
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/sales"
        >
          Акции
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/news"
        >
          Новости
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/comments"
        >
          Отзывы
        </NavLink>
      </div>
      <div className={footerStyle.wrapper}>
        <NavLink
          className={footerStyle.link}
          to="/orders"
        >
          Оплата и доставка
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/faq"
        >
          Часто спрашивают
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/feedback"
        >
          Обратная связь
        </NavLink>
        <NavLink
          className={footerStyle.link}
          to="/contacts"
        >
          Контакты
        </NavLink>
      </div>
      <div className={footerStyle.contactsWrapper}>
        <div>Мы на связи</div>
        <div>8 (999) 00-00-00</div>
        <a
          className={footerStyle.email}
          href="mailto:dogfood.ru@gmail.com"
        >
          dogfood.ru@gmail.com
        </a>
        <div className={footerStyle.logosWrapper}>
          <i
            className={classNames(
              'fa-brands fa-telegram',
              footerStyle.logoLinks,
            )}
          />
          <i
            className={classNames(
              'fa-brands fa-whatsapp',
              footerStyle.logoLinks,
            )}
          />
          <i
            className={classNames('fa-brands fa-viber', footerStyle.logoLinks)}
          />
          <i
            className={classNames(
              'fa-brands fa-square-instagram',
              footerStyle.logoLinks,
            )}
          />
          <i
            className={classNames('fa-brands fa-vk', footerStyle.logoLinks)}
          />
        </div>
      </div>
    </div>
  );
}
