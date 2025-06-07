import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();
  const isConstructor = pathname === '/';
  const isFeed = pathname.startsWith('/feed');
  const isProfile = pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 mr-10 ${isConstructor ? '' : styles.inactive}`}
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <p
              className={`text text_type_main-default ml-2 ${isFeed ? '' : styles.inactive}`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <NavLink to='/profile' className={styles.link_position_last}>
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default ml-2 `}>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};
