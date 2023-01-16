import footerStyle from './footer.module.css';
import logo from '../../Components/logo.jpg';
import { NavLink } from 'react-router-dom';

export function Footer() {
    return (
        <div className={footerStyle.footer}>
            <div className={footerStyle.logoCopyright}>
                <NavLink
                    className={footerStyle.logoWrapper}
                    to='/'
                >
                    <img
                        className={footerStyle.logo}
                        src={logo}
                        alt='logo'
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
                    to='/products'
                >
                    Каталог
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/sales'
                >
                    Акции
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/news'
                >
                    Новости
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/comments'
                >
                    Отзывы
                </NavLink>
            </div>
            <div className={footerStyle.wrapper}>
                <NavLink
                    className={footerStyle.link}
                    to='/paymentDelivery'
                >
                    Оплата и доставка
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/faq'
                >
                    Часто спрашивают
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/feedback'
                >
                    Обратная связь
                </NavLink>
                <NavLink
                    className={footerStyle.link}
                    to='/contacts'
                >
                    Контакты
                </NavLink>
            </div>
            <div className={footerStyle.contactsWrapper}>
                <div>Мы на связи</div>
                <div>8 (999) 00-00-00</div>
                <a
                    className={footerStyle.email}
                    href='mailto:dogfood.ru@gmail.com'
                >
                    dogfood.ru@gmail.com
                </a>
                <div className={footerStyle.logosWrapper}>
                    <i className='fa-brands fa-telegram'></i>
                    <i className="fa-brands fa-whatsapp"></i>
                    <i className="fa-brands fa-viber"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-vk"></i>
                </div>
            </div>
        </div>
    );
}
